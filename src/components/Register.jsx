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
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='register'>   
                <label>Username</label>
                <input type="text" name="username" value={registerData.username} onChange={handleChange} required />
            </div>
            <div className='register'>
                <label>Password</label>
                <input type="password" name="password" value={registerData.password} onChange={handleChange} required />
            </div>
            <div className='register'>
                <label>Address</label>
                <input type="text" name="address" value={registerData.address} onChange={handleChange} required />
            </div>
            <div className='register'> 
                <label>Mail</label>
                <input type="email" name="mail" value={registerData.mail} onChange={handleChange} required />
            </div>
            <div className='register'>
                <label>Role</label>
                <input type="text" name="role" value={registerData.role} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;