import React, { useEffect, useState } from 'react';
import './Packages.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Packages = () => {
    const { showToastMessage } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [isFormValidState, setIsFormValidState] = useState(false);
    const [currentPackage, setCurrentPackage] = useState({
        id: null,
        awb: null,
        created_on: null,
        delivery_address: null,
        package_email: null,
        pay_on_delivery: null,
        status: null,
        courier: null
    });

    const handleUpdate = () => {
    };

    const deletePackage = (pack) => {
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
                accessor: "package_email",
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
        </div>
    )
}

export default Packages;