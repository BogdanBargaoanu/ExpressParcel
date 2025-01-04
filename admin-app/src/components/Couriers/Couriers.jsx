import React, { useEffect, useState } from 'react';
import './Couriers.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Couriers = () => {
    const { showToastMessage } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [couriers, setCouriers] = useState([]);
    const [idManager, setIdManager] = useState(null);
    const [isFormValidState, setIsFormValidState] = useState(false);
    const [currentCourier, setCurrentCourier] = useState({
        id: null,
        name: null,
        email: null,
        password: null,
        manager: null
    });

    const fetchCouriers = () => {
        axios.get(`http://localhost:8083/couriers`)
            .then(response => {
                console.log(response);
                setCouriers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                showToastMessage('Failed to fetch couriers: ' + (error.response?.data?.error || 'Unknown error'));
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCouriers();
    }, []);

    const resetCurrentCourier = () => {
        setCurrentCourier({
            id: null,
            name: null,
            email: null,
            password: null,
            manager: null
        });
        setIdManager(null);
    };

    const handleUpdate = (courier) => {
        setIsFormValidState(true);
        console.log("Button clicked for courier: ", courier);
        setCurrentCourier(courier);
    };

    const updateCourier = () => {
        console.log("Updating courier: ", currentCourier);
        axios.put(`http://localhost:8083/couriers/${currentCourier.id}`, {
            email: currentCourier.email,
            name: currentCourier.name,
            password: currentCourier.password
        })
            .then(response => {
                console.log(response);
                fetchCouriers();
                showToastMessage('Courier updated successfully');
            })
            .catch(error => {
                console.error(error);
                showToastMessage('Failed to update courier: ' + (error.response?.data?.error || 'Unknown error'));
            });
        resetCurrentCourier();
    };

    const updateManager = (managerId) => {
        console.log(managerId);
        console.log("Updating manager for courier: ", currentCourier);
        axios.put(`http://localhost:8083/couriers`, null, {
            params: {
                courierId: currentCourier.id,
                managerId: managerId
            }
        })
            .then(response => {
                console.log(response);
                showToastMessage('Manager updated successfully');
            })
            .catch(error => {
                console.error(error);
                showToastMessage('Failed to update manager: ' + (error.response?.data?.error || 'Unknown error'));
            });
        resetCurrentCourier();
    };

    const deleteCourier = (courier) => {
        try {
            console.log(courier);
            const token = localStorage.getItem('user-token');
            const userId = token ? token.match(/\d+$/)[0] : null;
            console.log(userId);
            if (courier.id == userId) {
                showToastMessage("You cannot delete yourself");
                return;
            }
            axios.delete(`http://localhost:8083/couriers/${courier.id}`)
                .then(response => {
                    console.log(response);
                    /* var newCouriers = couriers.filter(c => c.id !== courier.id);
                    setCouriers(newCouriers); */
                    fetchCouriers();
                    showToastMessage('Courier deleted successfully');
                })
                .catch(error => {
                    console.error(error);
                    showToastMessage('Failed to delete courier: ' + (error.response?.data?.error || 'Unknown error'));
                });
        }
        catch (error) {
            console.error(error);
            showToastMessage('Failed to delete courier: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };

    const isFormValid = () => {
        if (!currentCourier.id) {
            showToastMessage("ID is required");
            return false;
        }
        if (!currentCourier.email) {
            showToastMessage("Email is required");
            return false;
        }
        if (!currentCourier.name) {
            showToastMessage("Name is required");
            return false;
        }
        if (!currentCourier.password) {
            showToastMessage("Password is required");
            return false;
        }
        return true;
    }

    const isFormValidManager = () => {
        if (!idManager) {
            showToastMessage("Manager is required");
            return false;
        }
        return true;
    }

    const validate = () => {
        setIsFormValidState(currentCourier.id && currentCourier.email && currentCourier.name && currentCourier.password);
    }

    const validateManager = () => {
        setIsFormValidState(idManager != null);
    };

    var data = React.useMemo(() => couriers, [couriers]);
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className='actions-container'>
                        <button onClick={() => { handleUpdate(row.original); setIdManager(null) }} type="button" className="btn btn-danger btn-update-manager" data-bs-toggle="modal" data-bs-target="#modal-managers">
                            Update manager
                        </button>
                        <button onClick={() => handleUpdate(row.original)} type="button" className="btn btn-danger btn-update" data-bs-toggle="modal" data-bs-target="#modal-couriers">
                            Update
                        </button>
                        <button className="btn-delete">
                            <span onClick={() => deleteCourier(row.original)} className="delete-message">CONFIRM DELETE</span>
                            <svg className="delete-svg" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2" >
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ),
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className='couriers-container'>
            <div id="couriers-table" className="table-container">
                {isLoading ? (<h1>Loading couriers...</h1>) : (<table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                )}
            </div>

            {/* Modal couriers */}
            <div id="modal-couriers" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Courier</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control couriers-input"
                                value={currentCourier.email || null}
                                onChange={(e) => { setCurrentCourier({ ...currentCourier, email: e.target.value }); validate() }}
                                placeholder="Enter email"
                            />
                            <input
                                type="text"
                                className="form-control couriers-input"
                                value={currentCourier.name || null}
                                onChange={(e) => { setCurrentCourier({ ...currentCourier, name: e.target.value }); validate() }}
                                placeholder="Enter name"
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss={isFormValidState ? "modal" : undefined}
                                onClick={() => {
                                    if (isFormValid()) {
                                        updateCourier();
                                    } else {
                                        setIsFormValidState(false); // Set form validity state
                                    }
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal managers */}
            <div id="modal-managers" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Manager for courier</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <select
                                className="form-control couriers-input"
                                value={currentCourier.manager == null ? "" : currentCourier.manager.id}
                                onChange={(e) => { setIdManager(e.target.value); validateManager() }}
                            >
                                <option value="" disabled>Select a manager...</option>
                                {couriers.map(courier => (
                                    <option key={courier.id} value={courier.id}>
                                        {courier.name + " " + courier.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss={isFormValidState ? "modal" : undefined}
                                onClick={() => {
                                    if (isFormValidManager()) {
                                        updateManager(idManager);
                                    } else {
                                        setIsFormValidState(false); // Set form validity state
                                    }
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Couriers;