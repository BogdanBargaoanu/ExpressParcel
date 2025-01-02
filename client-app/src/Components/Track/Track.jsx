import React, { useState, useCallback, useEffect } from 'react';
import logo from '../Assets/logo.png';
import axios from 'axios';
import { useTable } from 'react-table'
import { useNavigate } from 'react-router-dom';
import './Track.css';

const Track = () => {
    const navigate = useNavigate();

    const [managersAndPackages, setManagersAndPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchManagersAndPackages = () => {
        axios.get(`http://localhost:8083/couriers/delivered-by-managers`)
            .then(response => {
                console.log(response);
                const transformedData = response.data.map(item => ({
                    id: item[0],
                    name: item[1],
                    email: item[2],
                    numberOfPackages: item[3]
                }));
                setManagersAndPackages(transformedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchManagersAndPackages();
        setIsLoading(false);
    }, []);

    var data = React.useMemo(() => managersAndPackages, [managersAndPackages]);
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
                Header: "Number of Packages",
                accessor: "numberOfPackages",
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="container-track">
            <h1>Track</h1>
            <header>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}><img src={logo} className="logo" /> </a>
                <ul>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/track') }}>Track</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); alert('To be added in the future...') }}>What's New</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Contact</a></li>
                </ul>
            </header>

            <div id="managers-table" className="table-container">
                {isLoading ? (<h1>Loading currencies...</h1>) : (<table {...getTableProps()}>
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

export default Track;