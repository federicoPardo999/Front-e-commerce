import React from 'react';
import { Link } from 'react-router-dom';
import './back-button.css';
const ButtonBack = () => {
    return (<Link to= {-1} style={{ marginRight: '10px' }}>
                <button  className='button-comeback'><i className="fas fa-arrow-left"></i></button>
            </Link>)
}

export default ButtonBack