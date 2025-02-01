import { useEffect, useState } from 'react';
import { getProducts } from '../api/service/ProductService';  // Servicio que obtiene productos
import '../styles/ProductList.css';
import {useSelector} from 'react-redux';
import {addProductToCart} from '../api/service/CartService';
import HeaderButtons from './utils/HeaderButtons';


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);
  const [quantities, setQuantities] = useState({});
  const [errorStock,setErrorStock] = useState({});

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
  },[products]);

const handleQuantityChange = (idProduct, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [idProduct]: newQuantity,
    }));
};


  const handleAddCart = async (idProduct) => {
    try{
      if(role !== "CUSTOMER")
        alert("only customers can add products to cart")

      await addProductToCart(token,idProduct,quantities[idProduct]); 
      console.log("product added to cart");
    }catch(e){
      HandleError(idProduct)
      console.error('Error adding product to cart:', e);  
    }
  }

  const HandleError = (idProduct) =>{
    setErrorStock((errors) =>({
      ...errors,
      [idProduct] : `debe comprar ${products[idProduct].stock} productos o menos.`
    }));
}

  return (
    <div>
      <HeaderButtons/>
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
                  min= "1"
                  max={product.stock}
                  value = {quantities[product.idProduct] || 1}
                  name='Quantity of products' 
                  onChange={(e) => 
                    handleQuantityChange(product.idProduct, Number(e.target.value))}
                  />

                  {errorStock[product.idProduct] && <p className="message-error">{errorStock[product.idProduct]}</p>}

                  <button onClick={() => handleAddCart(product.idProduct)}>add to cart</button>
                  
                </div>
                
              ))
            ) : <p>No hay productos para mostrar</p> 
        }
        
      </div>
    </div>
  );
}