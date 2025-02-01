import { useState } from 'react';
import '../styles/ProductForm.css';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/service/ProductService';
import { useSelector } from 'react-redux';
import ButtonBack from './utils/BackButton';

export default function ProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image') {
      const file = files[0];
      setProductData(prev => ({ ...prev, [name]: file }));
      
      // Generar vista previa de la imagen
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
      
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('stock', productData.stock);
    formData.append('image', productData.image);

    try {
      await createProduct(formData, token);
      alert('Producto creado correctamente');
      navigate("/product-list");
      // Limpiar el formulario después del envío
      setProductData({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: null
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error creando el producto:', error);
      alert(`Error al crear el producto: ${error.message}`);
    }
  };

  return (
    <>
      <ButtonBack />
      <div className="product-form-container">
        <h2>Cargar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre del Producto</label>
            <input
              id="name"
              name="name"
              type="text"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Precio</label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="1"
              value={productData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Imagen del Producto</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Vista previa del producto" />
              </div>
            )}
          </div>
          <button type="submit">Cargar Producto</button>
        </form>

        <section>
          <button type="button" onClick={() => navigate("/product-list")}>
            Ver Productos
          </button>
        </section>
      </div>
    </>
  );
}