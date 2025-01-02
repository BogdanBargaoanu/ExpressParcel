import React, { useState, useCallback, useEffect } from 'react';
import logo from '../Assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Track.css';

const Track = () => {
    const navigate = useNavigate();

    return (
        <div class="container-track">
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
        </div>
    )
}

export default Track;