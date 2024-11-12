import React, { useState } from "react"
import axios from 'axios'
import './LoginRegister.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'
import { useToast } from '../Context/Toast/ToastContext'
import apiKey from '../../API-KEY.json'

const LoginPage = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { showToastMessage } = useToast();

    const handleLogin = () => {
        console.log(apiKey);
        /* axios.post('http://localhost:3000/partners/login', {
             username: username,
             password: password
         })
             .then(response => {
                 if (response.data.success) {
                     // The login was successful
                     localStorage.setItem('user-token', response.data.token);
                     window.location.href = '/dashboard';
                 }
             })
             .catch(error => {
                 showToastMessage('Invalid login: ' + (error.response?.data?.error || 'Unknown error'));
             });
             */
    };

    const handleSignUp = () => {
        const authHeader = 'Basic ' + btoa(`user:${apiKey.key}`);
        axios.post('http://localhost:8083/couriers', {
            name: name,
            email: email,
            password: password,
            manager_id: null,
            information: `Registration date:${Date.now().toString()}`
        },
            {
                headers: {
                    'Authorization': authHeader
                }
            })
            .then(response => {
                if (response.data.success) {
                    // The registration was successful
                    setName("");
                    setPassword("");
                    showToastMessage('Registration successful. Please login.');
                    setAction("Login");
                }
            })
            .catch(error => {
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

                {action === "Login" ? <div></div> : <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>}

                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

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