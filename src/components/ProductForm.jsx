import { useState } from 'react';
import '../styles/ProductForm.css';

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para guardar el producto, como hacer una petición a la API
    console.log('Producto cargado:', {
      name: productName,
      price: productPrice,
      description: productDescription,
    });
    // Limpiar el formulario después de enviar
    setProductName('');
    setProductPrice('');
    setProductDescription('');
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
        <button type="submit">Cargar Producto</button>
      </form>
    </div>
  );
}

export default ProductForm;
