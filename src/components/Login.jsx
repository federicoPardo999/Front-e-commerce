import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { login } from '../api/service/AuthService';
import {useDispatch} from 'react-redux';
import { setCredentials } from '../store/AuthSlice';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
      const loginData = {
        username: username,
        password: password,
      };

    try{
      const result = await login(loginData);
      if (result && result.token) {
          dispatch(setCredentials({
          username: result.username,
          token: result.token,
          role: result.role,

        }));
        navigate('/home');
        
      }else{
        setError('Invalid credential')
      }

      }catch (error){
      console.error('Error logging in:', error);
    }
  };

  return (
    <section className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username 
          <input
            name  = "username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </label>
         
        </div>
        <div>
          <label>Password
          <input
            name  = "password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </label>
          
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
