import { useEffect, useState } from 'react';
import { getProducts } from '../api/service/ProductService';  // Servicio que obtiene productos
import '../styles/ProductList.css';
import PurchasedProduct from './PurchasedProduct';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
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
                  {/* esto hay que mejorar bastante*/}
                  <button onClick={ <PurchasedProduct idCustomer={1} idProduct={key}></PurchasedProduct>}> comprar </button>
                </div>
              ))
            ) : <p>No hay productos para mostrar</p> 
        }
        
      </div>
    </div>
  );
}