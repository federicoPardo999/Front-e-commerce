import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

export default function Routing() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/product-list" element={<ProductList />} />

      </Routes>
    </Router>
  );
}