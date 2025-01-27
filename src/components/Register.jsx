import React, { useState } from 'react';
import { register } from '../api/service/AuthService.js';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        address: '',
        password: '',
        mail: '',
        role: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(registerData);
            navigate('/login'); 
        }catch (error) {
            console.error("usuario ya registrado");
            setError("usuario ya registrado");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='register'>   
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" value={registerData.username} onChange={handleChange} required />
            </div>
            <div className='register'>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={registerData.password} onChange={handleChange} required />
            </div>
            <div className='register'>
                <label htmlFor="address">Address</label>
                <input id="address" type="text" name="address" value={registerData.address} onChange={handleChange} required />
            </div>
            <div className='register'> 
                <label htmlFor="mail">Mail</label>
                <input id="mail" type="email" name="mail" value={registerData.mail} onChange={handleChange} required />
            </div>
            <select className='role-container' id="role" name="role" value={registerData.role} onChange={handleChange}>
                <option className='role-input' value="">Select role</option>
                <option className='role-input' value="ADMIN">ADMIN</option>
                <option className='role-input' value="CUSTOMER">CUSTOMER</option>
            </select>
            {error && <p className='error-message'>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;