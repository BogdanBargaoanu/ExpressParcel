import React, { useEffect, useState } from 'react';
import './Couriers.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Couriers = () => {
    const { showToastMessage } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [couriers, setCouriers] = useState([]);
    const [isFormValidState, setIsFormValidState] = useState(false);
    const [currentCourier, setCurrentCourier] = useState({
        id: null,
        name: null,
        email: null,
        password: null,
        manager: null
    });

    const resetCurrentCourier = () => {
        setCurrentCourier({
            id: null,
            name: null,
            email: null,
            password: null,
            manager: null
        });
    };

    const handleUpdate = (courier) => {
    };

    const deleteCourier = (courier) => {
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

    const validate = () => {
        setIsFormValidState(currentCourier.id && currentCourier.email && currentCourier.name && currentCourier.password);
    }

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
                        <button onClick={() => handleUpdate(row.original)} type="button" className="btn btn-primary btn-update" data-bs-toggle="modal" data-bs-target="#modal-rate">
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
                {isLoading ? (<h1>Loading rates...</h1>) : (<table {...getTableProps()}>
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

            {/* Modal */}
            <div id="modal-rate" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Rate</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control couriers-input"
                                value={currentCourier.email || null}
                                onChange={(e) => { setCurrentCourier({ ...currentCourier, email: e.target.value }); validate() }}
                                placeholder="Enter date"
                            />
                            <input
                                type="text"
                                className="form-control couriers-input"
                                value={currentCourier.name !== null}
                                onChange={(e) => { setCurrentCourier({ ...currentCourier, name: e.target.value }); validate() }}
                                placeholder="Enter value"
                            />
                            <select
                                className="form-control couriers-input"
                                value={currentCourier.idLocation || ''}
                                onChange={(e) => { setCurrentCourier({ ...currentCourier, manager: e.target.value }); validate() }}
                            >
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss={isFormValidState ? "modal" : undefined}
                                onClick={() => {
                                    if (isFormValid()) {
                                        //currentCourier.id === null ? insertRate() : updateRate();
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