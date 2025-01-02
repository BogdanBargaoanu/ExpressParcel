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
    const [status, setStatus] = useState('');

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
                    setStatus(status);
                }
                catch (error) {
                    console.error("Error parsing package data:", error);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching package:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (awb.length > 0) {
            fetchPackage(awb);
        }
    }, [awb, fetchPackage]);

    const generateMapUrlFromAddress = (address) => {
        if (address) {
            return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=10&maptype=roadmap`;
        }
        return '';
    };

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
                    {packageData != null && packageData.length > 0 ? (
                        <>
                            <h1 className="awb-heading">Order status:</h1>
                            <div className="icon-container">
                                <div id='current-new' className={`status-icon ${status === 'NEW' ? 'current-status' : ''}`}>
                                    <FaTruckLoading />
                                    <span className='new'>New</span>
                                </div>
                                <div id='current-pending' className={`status-icon ${status === 'PENDING' ? 'current-status' : ''}`}>
                                    <TbTruckDelivery />
                                    <span className='pending'>Pending</span>
                                </div>
                                <div id='current-delivered' className={`status-icon ${status === 'DELIVERED' ? 'current-status' : ''}`}>
                                    <FaCalendarCheck />
                                    <span className='delivered'>Delivered</span>
                                </div>
                            </div>
                            <div className="maps-wrapper">
                                <iframe
                                    width="100%"
                                    height="300px"
                                    loading="lazy"
                                    allowFullScreen
                                    src={generateMapUrlFromAddress(packageData[0].deliveryAddress)}
                                ></iframe>
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