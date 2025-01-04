import React, { useEffect, useState } from 'react';
import './Packages.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Packages = () => {
    const { showToastMessage } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const [isFormValidState, setIsFormValidState] = useState(false);
    const [currentPackage, setCurrentPackage] = useState({
        id: null,
        awb: null,
        createdOn: null,
        deliveryAddress: null,
        packageEmail: null,
        payOnDelivery: null,
        status: null,
        courier: null
    });

    const resetCurrentPackage = () => {
        setCurrentPackage({
            id: null,
            awb: null,
            createdOn: null,
            deliveryAddress: null,
            packageEmail: null,
            payOnDelivery: null,
            status: null,
            courier: null
        });
    };

    const fetchCouriers = () => {
        axios.get(`http://localhost:8083/couriers`)
            .then(response => {
                console.log(response);
                setCouriers(response.data);
            })
            .catch(error => {
                console.error(error);
                showToastMessage('Failed to fetch couriers: ' + (error.response?.data?.error || 'Unknown error'));
            });
    };

    const insertPackage = () => {
        currentPackage.createdOn = new Date().toISOString();
        console.log("Inserting new package:", currentPackage);
        axios.post(`http://localhost:8083/packages`, {
            awb: currentPackage.awb,
            createdOn: currentPackage.createdOn,
            deliveryAddress: currentPackage.deliveryAddress,
            packageEmail: currentPackage.packageEmail,
            payOnDelivery: currentPackage.payOnDelivery,
            status: currentPackage.status,
            courier: currentPackage.courier
        })
            .then(response => {
                console.log(response);
                showToastMessage('Package inserted successfully');
            })
            .catch(error => {
                console.error(error);
                showToastMessage('Failed to insert package: ' + (error.response?.data?.error || 'Unknown error'));
            });
        resetCurrentPackage();
    };

    useEffect(() => {
        fetchCouriers();
    }, []);

    const handleInsertClick = () => {
        setIsFormValidState(false);
        resetCurrentPackage();
    };

    const handleUpdate = () => {
    };

    const updatePackage = (pack) => {
    };

    const deletePackage = (pack) => {
    };

    const isFormValid = () => {
        if (!currentPackage.awb) {
            showToastMessage("AWB is required");
            return false;
        }
        if (!currentPackage.deliveryAddress) {
            showToastMessage("Delivery address is required");
            return false;
        }
        if (!currentPackage.packageEmail) {
            showToastMessage("Package email is required");
            return false;
        }
        if (!currentPackage.payOnDelivery) {
            showToastMessage("Pay on delivery info is required");
            return false;
        }
        if (!currentPackage.courier) {
            showToastMessage("A courier is required");
            return false;
        }
        return true;
    }

    const validate = () => {
        setIsFormValidState(currentPackage.id && currentPackage.awb && currentPackage.deliveryAddress && currentPackage.packageEmail && currentPackage.payOnDelivery && currentPackage.courier);
    }

    const generateMapUrlFromAddress = (address) => {
        if (address) {
            return `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${encodeURIComponent(address)}&zoom=10&maptype=roadmap`;
        }
        return '';
    };

    var data = React.useMemo(() => packages, [packages]);
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "AWB",
                accessor: "awb",
            },
            {
                Header: "Email",
                accessor: "packageEmail",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className='actions-container'>
                        <button onClick={() => handleUpdate(row.original)} type="button" className="btn btn-danger btn-update-manager" data-bs-toggle="modal" data-bs-target="#modal-managers">
                            Update manager
                        </button>
                        <button onClick={() => handleUpdate(row.original)} type="button" className="btn btn-danger btn-update" data-bs-toggle="modal" data-bs-target="#modal-couriers">
                            Update
                        </button>
                        <button className="btn-delete">
                            <span onClick={() => deletePackage(row.original)} className="delete-message">CONFIRM DELETE</span>
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
        <div className='packages-container'>
            <div id="packages-table" className="table-container">
                {isLoading ? (<h1>Loading packages...</h1>) : (<table {...getTableProps()}>
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

            {/* Modal packages */}
            <div id="modal-packages" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Package</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control packages-input"
                                value={currentPackage.awb || null}
                                onChange={(e) => { setCurrentPackage({ ...currentPackage, awb: e.target.value }); validate() }}
                                placeholder="Enter email"
                            />
                            <input
                                type="text"
                                className="form-control packages-input"
                                value={currentPackage.deliveryAddress || null}
                                onChange={(e) => { setCurrentPackage({ ...currentPackage, deliveryAddress: e.target.value }); validate() }}
                                placeholder="Enter delivery address"
                            />
                            <input
                                type="text"
                                className="form-control packages-input"
                                value={currentPackage.packageEmail || null}
                                onChange={(e) => { setCurrentPackage({ ...currentPackage, packageEmail: e.target.value }); validate() }}
                                placeholder="Enter package email"
                            />
                            <div class="form-check packages-input">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={currentPackage.payOnDelivery || null}
                                    id="flexCheckDefault"
                                    onChange={(e) => { setCurrentPackage({ ...currentPackage, payOnDelivery: e.target.checked }); validate(); console.log(currentPackage) }}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Pay on delivery
                                </label>
                            </div>
                            <select
                                className="form-control packages-input"
                                value={currentPackage.status == null ? "" : currentPackage.status}
                                onChange={(e) => { setCurrentPackage({ ...currentPackage, status: e.target.value }); validate() }}
                            >
                                <option value="" disabled>Select a status...</option>
                                <option key='0' value='0'>
                                    New
                                </option>
                                <option key='1' value='1'>
                                    Pending
                                </option>
                                <option key='2' value='2'>
                                    Delivered
                                </option>
                            </select>
                            <select
                                className="form-control packages-input"
                                value={currentPackage.courier == null ? "" : currentPackage.courier.id}
                                onChange={(e) => { setCurrentPackage({ ...currentPackage, courier: couriers.find(courier => (courier.id == e.target.value)) }); validate() }}
                            >
                                <option value="" disabled>Select a courier...</option>
                                {couriers.map(courier => (
                                    <option key={courier.id} value={courier.id}>
                                        {courier.name + " " + courier.email}
                                    </option>
                                ))}
                            </select>
                            <div className="maps-wrapper">
                                <iframe
                                    width="100%"
                                    height="300px"
                                    loading="lazy"
                                    allowFullScreen
                                    src={generateMapUrlFromAddress(currentPackage.deliveryAddress)}
                                ></iframe>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss={isFormValidState ? "modal" : undefined}
                                onClick={() => {
                                    if (isFormValid()) {
                                        currentPackage.id !== null ? updatePackage() : insertPackage();
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
            <button onClick={() => handleInsertClick()} type="button" class="btn-insert" data-bs-toggle="modal" data-bs-target="#modal-packages">
                Insert
            </button>
        </div>
    )
}

export default Packages;