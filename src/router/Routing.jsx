import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Register from '../components/Register';
import Home from './Home';
import MainPage from '../components/MainPage';
import ProtectedRoute from './ProtectedRoute';
import Cart from '../components/Cart';
import PurchaseHistory from '../components/PurchaseHistory';

export default function Routing() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute AllowedRulles ={["ADMIN"]} />} >
            <Route path="/product-form" element={<ProductForm />} />
        </Route>

        <Route element={<ProtectedRoute AllowedRulles ={["CUSTOMER","ADMIN"]} />} >
            <Route path="/product-list" element={<ProductList />} />
        </Route>

        <Route element={<ProtectedRoute AllowedRulles ={["CUSTOMER"]} />} >
            <Route path='/cart' element={<Cart />} />
            <Route path='/purchase-history' element={<PurchaseHistory />} />  
        </Route>

      </Routes>
    </Router>
  );
}