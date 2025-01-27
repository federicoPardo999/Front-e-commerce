import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Bienvenido a Nuestro E-Commerce</h1>
            <p>
                Esta es una aplicación de comercio electrónico donde puedes comprar una variedad de productos. 
                Por favor, inicia sesión o regístrate para comenzar a comprar.
            </p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ marginRight: '10px' }}>
                    <button>Iniciar Sesión</button>
                </Link>
                <Link to="/register">
                    <button>Registrarse</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;