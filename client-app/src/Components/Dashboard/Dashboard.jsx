import React, { useState } from "react";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container-dashboard">
            <section className="dashboard-section">
                {/* Circle background */}
                <div className="circle"></div>

                {/* Header (Logo, menu) */}
                <header>
                    <a href="#"><img src="images/logo.png" className="logo" /> </a>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Track</a></li>
                        <li><a href="#">What's New</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </header>

                {/* Middle content */}
                <div className="middle-content">
                    {/* Left side content */}
                    <div className="textBox">
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

                    {/* Right image box */}
                    <div className="imgBox">
                        <img src="images/img1.png" className="starbucks" />
                    </div>
                </div>
                {/* End middle content */}

                {/* Bottom thumbnails */}
                <ul className="bottom-thumbnails">
                    <li><img src="" /></li>
                    <li><img src="" /></li>
                    <li><img src="" /></li>
                </ul>

                {/* Social links sidebar */}
                <ul className="social-links">
                    <li>
                        <a href="#"><img src="images/facebook.png" /></a>
                    </li>
                    <li>
                        <a href="#"><img src="images/twitter.png" /></a>
                    </li>
                    <li>
                        <a href="#"><img src="images/instagram.png" /></a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;