import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';

const AwbTrack = () => {
    const navigate = useNavigate();

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