import { useEffect, useState } from 'react';
import { getProducts } from '../api/service/ProductService';  // Servicio que obtiene productos
import '../styles/ProductList.css';
import {useSelector} from 'react-redux';

import {addProductToCart} from '../api/service/CartService';


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(token);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

const handleQuantityChange = (idProduct, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [idProduct]: newQuantity,
    }));
};

  const handleAddCart = async (idProduct) => {
    try{
      console.log(idProduct,quantities);
      await addProductToCart(token,idProduct,quantities[idProduct]); 
    }catch(e){
      console.error('Error adding product to cart:', e);  
    }
  }

  return (
    <div>
      <h2>List of products</h2>
      <div className="product-list">
        {
            (products.length > 0) ? (
              products.map((product) => (
                <div className="product-card" key={product.idProduct}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">Precio: ${product.price}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <input 
                  placeholder='Quantity to add'
                  type= 'number'
                  min={1}
                  value = {quantities[product.idProduct] || 1}
                  name='Quantity of products' 
                  onChange={(e) => 
                    handleQuantityChange(product.idProduct, Number(e.target.value))}
                  />
                  <button onClick={() => handleAddCart(product.idProduct)}>add to cart</button>
                </div>
              ))
            ) : <p>No hay productos para mostrar</p> 
        }
        
      </div>
    </div>
  );
}