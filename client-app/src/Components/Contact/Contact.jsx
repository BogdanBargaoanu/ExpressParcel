import React, { useState, useEffect } from 'react';
import logo from '../Assets/logo.png';
import axios from 'axios';
import { useTable } from 'react-table'
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const navigate = useNavigate();

    const [availableCouriers, setAvailableCouriers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAvailableCouriers = () => {
        axios.get(`http://localhost:8083/couriers/no-pending-packages`)
            .then(response => {
                console.log(response);
                setAvailableCouriers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchAvailableCouriers();
        setIsLoading(false);
    }, []);

    var data = React.useMemo(() => availableCouriers, [availableCouriers]);
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
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });


    return (
        <div className="contact-container">
            <h1>Contact</h1>
            <header>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}><img src={logo} className="logo" /> </a>
                <ul>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/track') }}>Track</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); alert('To be added in the future...') }}>What's New</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Contact</a></li>
                </ul>
            </header>

            <div id="couriers-table" className="table-container">
                {isLoading ? (<h1>Loading available couriers...</h1>) : (<table {...getTableProps()}>
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

export default Contact;