import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderButtons() {
    const navigate = useNavigate();

    return (
        <div className="button-container">
         
            <button 
                className="button-volver" 
                onClick={() => navigate('/')} 
            >
                <i className="fas fa-arrow-left"></i> Volver
            </button>

            <button 
                className="button-carrito" 
                onClick={() => navigate('/cart')} 
            >
                <i className="fas fa-shopping-cart"></i> Carrito
            </button>
        </div>
    );
}

export default HeaderButtons;