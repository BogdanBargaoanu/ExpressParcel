import React, { useState, useCallback, useEffect } from 'react';
import './AwbTrack.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../Assets/logo.png';
import axios from 'axios';
import { FaTruckLoading, FaCalendarCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const AwbTrack = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [awb, setAwb] = useState('');
    const [packageData, setPackageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (queryParams.has('awb')) {
            setAwb(queryParams.get('awb'));
        }
    }, [queryParams]);

    const fetchPackage = useCallback((awb) => {
        console.log('fetching nearest rates');
        console.log(process.env.REACT_APP_API_KEY);
        axios.get(`http://localhost:8083/packages/find`, {
            params: {
                awb: awb
            },
        })
            .then(response => {
                console.log(response);
                setPackageData(response.data);
                try {
                    var status = response.data[0].status;
                    console.log(status);
                    if (status) {
                        const statusElementId = `current-${status.toLowerCase()}`;
                        const statusElement = document.getElementById(statusElementId);
                        if (statusElement) {
                            statusElement.classList.add('current-status');
                        }
                    }
                }
                catch (error) {
                    console.error("Error parsing package data:", error);
                }

            })
            .catch(error => {
                console.error("Error fetching package:", error);
            });
    }, []);

    useEffect(() => {
        if (awb.length > 0) {
            fetchPackage(awb);
            setIsLoading(false);
        }
    }, [awb, fetchPackage]);

    return (
        <div>
            {/* Header (Logo, menu) */}
            <header>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}><img src={logo} className="logo" /> </a>
                <ul>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a></li>
                    <li><a href="#">Track</a></li>
                    <li><a href="#">What's New</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </header>

            {/* Main content */}
            {isLoading ? (<h1>Loading package...</h1>) : (
                <div className="awb-container">
                    {packageData != null > 0 ? (
                        <>
                            <h1 className="awb-heading">Order status:</h1>
                            <div className="icon-container">
                                <div id='current-new' className='status-icon'>
                                    <FaTruckLoading />
                                    <span className='new'>New</span>
                                </div>
                                <div id='current-pending' className='status-icon'>
                                    <TbTruckDelivery />
                                    <span className='pending'>Pending</span>
                                </div>
                                <div id='current-delivered' className='status-icon'>
                                    <FaCalendarCheck />
                                    <span className='delivered'>Delivered</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1 className="no-order-message">No order found with the provided AWB number.</h1>
                    )}
                </div>
            )}
        </div>
    )
}

export default AwbTrack;