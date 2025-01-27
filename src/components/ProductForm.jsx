import { useState } from 'react';
import '../styles/ProductForm.css';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/service/ProductService';  // Usa la función del servicio

export default function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null); // Para manejar la imagen
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');
  
  const navigate = useNavigate();

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
    formData.append('category', productCategory);
    if (productImage) formData.append('image', productImage);

    try {
      await createProduct(formData);
      alert('Producto creado correctamente');
    } catch (error) {
      console.error('Error creando el producto:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Cargar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoría</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            min={1}
            required
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="file"
            onChange={handleImageChange}
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
    
  );

}