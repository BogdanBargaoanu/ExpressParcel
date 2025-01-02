import React, {useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';

const AwbTrack = () => {
    return (
        <div>
            {/* Header (Logo, menu) */}
            <header>
                <a href="#"><img src={logo} className="logo" /> </a>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Track</a></li>
                    <li><a href="#">What's New</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </header>
        </div>
    )
}

export default AwbTrack;