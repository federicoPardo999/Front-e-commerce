import React, { useEffect, useState } from "react";
import { getProductsCart, updateStockProduct } from "../api/service/CartService";
import {buyCart} from "../api/service/OrderService"
import { useSelector } from 'react-redux';
import '../styles/Cart.css';
import { data } from "react-router-dom";
import { updateStockProductsPurchase } from "../api/service/ProductService";
import ButtonBack from "./utils/BackButton";

export default function Cart() {


  const token = useSelector((state) => state.user.token);
  const [productsCart, setProductsCart] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [errorStock, setErrorStock] = useState('');

  useEffect(() => {
    const fetchProductsCart = async () => {
      try {
        await updateProductCart()
      } catch (error) {
        console.error('Error fetching products of the cart:', error);
      }
    };
    fetchProductsCart();
  }, []);

  const handleQuantityChange = (idProduct, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [idProduct]: newQuantity,
    }));
  };

  const handleUpdateStock = async (idProduct, newStock) => {
    try {
      await updateStockProduct(token, idProduct, newStock);
      await updateProductCart()

    } catch (error) {
      console.error('Error updating stock:', error.message);
      setErrorStock(`Error al actualizar el stock, la cantidad a
        comprar tiene que ser menor/igual que: ${data.products[idProduct].stock} `);
    }
  };

    const handleBuy = async () =>{
        try{
          await buyCart(token);
          await updateProductCart()
          await updateStockProducts()
        }catch(e){
          console.error('error realizando compra del carrito',e);
        } 
    }

    const updateStockProducts = async () =>{
      try{
        await updateStockProductsPurchase(productsCart,token)
      }catch(e){
        console.error('error al actualizar stock de los productos')

      }
    }

    const updateProductCart = async () =>{
        const data = await getProductsCart(token);
        setProductsCart(data.products);
        setTotalSpent(data.totalSpent);
    }

    

  return (
    <div className="cart-container">
      
      <ButtonBack/>

      <h2>Cart</h2>
      <div className="cart-product-list">
        {productsCart.length > 0 ? (
          productsCart.map((product) => (
            <div className="cart-product-card" key={product.idProduct}>
              <img src={product.image} alt={product.name} className="cart-product-image" />
              <h3 className="cart-product-name">{product.name}</h3>
              <p className="cart-product-price">Precio unitario: ${product.price}</p>
              <p className="cart-product-stock">Stock disponible: {product.stock}</p>
              {errorStock && <p className="message-error">{errorStock}</p>}
              <div className="cart-product-quantity">
                <label>Cantidad:</label>
                <input
                  type="number"
                  min={1} // aca hay un bug
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

      <div >
          <button onClick={() => handleBuy()} className="button-buy"> Finalizar Compra </button>
      </div>
        
    </div>
    
  );
}