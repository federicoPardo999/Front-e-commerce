import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ProductForm from './ProductForm';

function Routing() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-form" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default Routing;
