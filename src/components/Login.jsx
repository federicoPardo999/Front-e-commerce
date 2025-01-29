import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { login } from '../api/service/AuthService';
import {useDispatch} from 'react-redux';
import { setCredentials } from '../store/AuthSlice';
import { Link } from 'react-router-dom';

export default function Login() {

  const [loginData, setLoginData] = useState({
          username: '',
          password: ''
      });

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
        ...loginData,
        [name]: value
    });

  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try{
      const result = await login(loginData);
      if (result?.token) {
          dispatch(setCredentials({
          username: result.username,
          token: result.token,
          role: result.role,
          }));

          console.log('token: ', result.token);
        navigate('/home');
      }

    } catch (e) {
      console.error('Error login: username or password incorrect');
      setError('username or password incorrect');
    }
  };

  return (
    <>
      <Link to="/" style={{ marginRight: '10px' }}>
            <button className='login-comeback'>Volver</button>
      </Link>
      <section className="login-container">
        <h2>Login</h2>
       
        <form onSubmit={handleLogin}>
        {error && <p  className='error-message'>{error}</p>}
          <div>
            <label htmlFor='username'>Username</label>
            <input
              id = "username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          
          </div>
          <div>
            <label htmlFor='password'>Password </label>
              <input
                id = "password"
                name  = "password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}
