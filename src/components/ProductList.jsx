import { useEffect, useState } from 'react';
import { getProducts } from '../api/service/ProductService';  // Servicio que obtiene productos
import '../styles/ProductList.css';
import {useSelector} from 'react-redux';


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);

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

  return (
    <div>
      <h2>Lista de Productos</h2>
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
                </div>
              ))
            ) : <p>No hay productos para mostrar</p> 
        }
        
      </div>
    </div>
  );
}