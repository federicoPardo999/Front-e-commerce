import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const role  = useSelector((state) => state.auth?.role);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Role:', role);
    if (role === 'ADMIN') 
      navigate('/product-form');

    else if (role === 'CUSTOMER') 
      navigate('/product-list');
    

  }, [role, navigate]);

  return null; 
};

export default Home;