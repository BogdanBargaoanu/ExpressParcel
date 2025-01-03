import React, { useState } from "react"
import axios from 'axios'
import './LoginRegister.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../Context/Toast/ToastContext'

const LoginPage = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { showToastMessage } = useToast();

    const handleLogin = () => {
        if (email === "") {
            showToastMessage('Email is required');
            return;
        }
        if (password === "") {
            showToastMessage('Password is required');
            return;
        }
        axios.post('http://localhost:8083/couriers/login', {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response);
                if (response.data.id) {
                    // The login was successful
                    localStorage.setItem('user-token', `fictional-token${response.data.id}`);
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                showToastMessage('Invalid login: ' + (error.response?.data?.error || 'Unknown error'));
            });
    };

    const handleSignUp = () => {
        if (email === "") {
            showToastMessage('Email is required');
            return;
        }
        if (name === "") {
            showToastMessage('Name is required');
            return;
        }
        if (password === "") {
            showToastMessage('Password is required');
            return;
        }
        axios.post('http://localhost:8083/couriers', {
            name: name,
            email: email,
            password: password,
            manager: null
        })
            .then(response => {
                console.log(response);
                if (response.data.id) {
                    // The registration was successful
                    setEmail("");
                    setName("");
                    setPassword("");
                    showToastMessage('Registration successful. Please login.');
                    setAction("Login");
                }
            })
            .catch(error => {
                console.log(error);
                showToastMessage('Invalid registration: ' + (error.response?.data?.error || 'Unknown error'));
            });
    };
    return (
        <div className="container-login">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {action === "Login" ? <div></div> : <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>}

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { action === "Sign Up" ? handleSignUp() : setAction("Sign Up") }}>Sign-up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { action === "Login" ? handleLogin() : setAction("Login") }}>Login</div>
            </div>
        </div>)
}

export default LoginPage