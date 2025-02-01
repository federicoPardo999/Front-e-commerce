import { useState } from 'react';
import '../styles/ProductForm.css';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/service/ProductService';  // Usa la función del servicio
import { useSelector } from 'react-redux';
import ButtonBack from './utils/BackButton';

export default function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  //const [productImage, setProductImage] = useState(null); // Para manejar la imagen
  const [productStock, setProductStock] = useState('');

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el FormData para enviar la imagen y otros campos
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('stock', productStock);
    //if (productImage) formData.append('image', productImage);

    try {
      await createProduct(formData,token);
      alert('Producto creado correctamente');
    } catch (error) {
      console.error('Error creando el producto:', error);
      alert('Error al crear el producto');
    }
  };

  return (
    <>
        <ButtonBack></ButtonBack>
        
        <div className="product-form-container">
        <h2>Cargar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">Nombre del Producto</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Precio</label>
            <input
              id="productPrice"
              type="number"
              min={1}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productDescription">Descripción</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productStock">Stock</label>
            <input
              id="productStock"
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              min={1}
              required
            />
          </div>
          
          <button type="submit">Cargar Producto</button>
        </form>

        <section>
          <button type="button" onClick={() => {navigate("/product-list")}}>
            Ver Productos
          </button>
        </section>
      </div>
    </>
 );
}