import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../Assets/logo.png';
import axios from 'axios';

const AwbTrack = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [awb, setAwb] = useState('');
    const [packageData, setPackageData] = useState(null);

    useEffect(() => {
        if (queryParams.has('awb')) {
            setAwb(queryParams.get('awb'));
        }
    }, [queryParams]);

    const fetchPackage = useCallback((awb) => {
        console.log('fetching nearest rates');
        console.log(process.env.REACT_APP_API_KEY);
        axios.get(`http://localhost:8083/packages`, {
            params: {
                awb: awb
            },
            auth: {
                username: 'user',
                password: process.env.REACT_APP_API_KEY
            }
        })
            .then(response => {
                console.log(response);
                setPackageData(response.data);
            })
            .catch(error => {
                console.error("Error fetching package:", error);
            });
    }, []);

    useEffect(() => {
        if (awb.length > 0) {
            fetchPackage(awb);
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
        </div>
    )
}

export default AwbTrack;