import React, { useEffect, useState } from "react";
import { getProductsCart, updateStockProduct } from "../api/service/CartService";
import { useSelector } from 'react-redux';
import '../styles/Cart.css';
export default function Cart() {

  const token = useSelector((state) => state.user.token);
  const [productsCart, setProductsCart] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [quantities, setQuantities] = useState({});
  // Obtener los productos del carrito al cargar el componente
  useEffect(() => {
    const fetchProductsCart = async () => {
      try {
        const data = await getProductsCart(token);
        setProductsCart(data.products);
        setTotalSpent(data.totalSpent);
      } catch (error) {
        console.error('Error fetching products of the cart:', error);
      }
    };
    fetchProductsCart();
  }, []);

  // Manejar el cambio en la cantidad de un producto
  const handleQuantityChange = (idProduct, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [idProduct]: newQuantity,
    }));
  };

  // Actualizar el stock de un producto en el backend
  const handleUpdateStock = async (idProduct, newStock) => {
    try {
      // Llamar al endpoint para actualizar el stock
      const updatedCart = await updateStockProduct(token, idProduct, newStock);

      
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-product-list">
        {productsCart.length > 0 ? (
          productsCart.map((product) => (
            <div className="cart-product-card" key={product.idProduct}>
              <img src={product.image} alt={product.name} className="cart-product-image" />
              <h3 className="cart-product-name">{product.name}</h3>
              <p className="cart-product-price">Precio unitario: ${product.price}</p>
              <p className="cart-product-stock">Stock disponible: {product.stock}</p>
              <div className="cart-product-quantity">
                <label>Cantidad:</label>
                <input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantities[product.idProduct] || product.stockToBuy}
                  onChange={(e) => handleQuantityChange(product.idProduct, Number(e.target.value))}
                  className="cart-quantity-input"
                />
                <button 
                  onClick={() => handleUpdateStock(product.idProduct, quantities[product.idProduct])}
                  className="cart-update-button"
                >
                  Actualizar
                </button>
              </div>
              <p className="cart-product-total">Total: ${product.pricePurchased}</p>
            </div>
          ))
        ) : (
          <p className="cart-empty-message">No hay productos en el carrito</p>
        )}
      </div>
      <div className="cart-total-spent">
        <h3>Total gastado: ${totalSpent}</h3>
      </div>
        
    </div>
    
  );
}