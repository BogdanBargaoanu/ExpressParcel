import React, { useState } from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Dashboard = () => {
    const navigate = useNavigate();
    const [awb, setAwb] = useState('');

    const handleAwb = (e) => {
        setAwb(e.target.value);
    };

    return (
        <div className="container-dashboard">
            <section className="dashboard-section">
                {/* Circle background */}
                <div className="circle"></div>

                {/* Header (Logo, menu) */}
                <header>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}><img src={logo} className="logo" /> </a>
                    <ul>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/track') }}>Track</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); alert('To be added in the future...') }}>What's New</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact') }}>Contact</a></li>
                    </ul>
                </header>

                {/* Middle content */}
                <div className="middle-content">
                    {/* Left side content */}
                    <div className="main-description">
                        <h2>
                            Not your simple delivery solution<br />
                            <span>ExpressParcel</span>
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo.
                        </p>
                        <a href="#">Learn More</a>
                    </div>

                    {/* Right search box */}
                    <div className="search-box">
                        <input type="text" className="awb-search" required onChange={handleAwb} />
                        <div className="awb-label">Enter the AWB</div>
                        <button className="track-btn" onClick={() => navigate(`/awbtrack?awb=${awb}`)}>Track</button>
                    </div>
                </div>
                {/* End middle content */}

                {/* Bottom thumbnails 
                <ul className="bottom-thumbnails">
                    <li><img src="" /></li>
                    <li><img src="" /></li>
                    <li><img src="" /></li>
                </ul>
                */}

                {/* Social links sidebar */}
                <ul className="social-links">
                    <li>
                        <a href="#" className="social-link"><FaFacebookF /></a>
                    </li>
                    <li>
                        <a href="#" className="social-link"><FaInstagram /></a>
                    </li>
                    <li>
                        <a href="#" className="social-link"><FaLinkedinIn /></a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;