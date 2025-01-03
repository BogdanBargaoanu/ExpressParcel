import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Contact = () => {
    return (
        <div className='dashboard-container'>
            <div className="dashboard-content">
                <h1 className='dashboard-header'>Not your simple delivery solution<br />
                    <span>ExpressParcel</span>
                </h1>
                <p className="dashboard-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>
        </div>
    )
}

export default Contact;