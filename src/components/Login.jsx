import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { login } from '../api/service/AuthService';
import {useDispatch} from 'react-redux';
import { setCredentials } from '../store/AuthSlice';

export default function Login() {

  const [loginData, setLoginData] = useState({
          username: '',
          password: ''
      });

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/');
  }

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
        navigate('/home');
        
      }else{
        setError('Invalid credential')
      }

    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <>
      <div className='container-button-back'>
          <button onClick={handleBack}> asdsda</button>
      </div>
      <section className="login-container">
        <h2>Login</h2>
        {error && <p className='mensaje-error'>{error}</p>}
        <form onSubmit={handleLogin}>
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
