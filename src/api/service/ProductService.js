import axios from 'axios';
import API_URL from '../config'; 

export const createProduct = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error creando el producto:', error);
      throw error;
    }
  };

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/get-all`);
    return response.data;  // Suponiendo que la respuesta sea una lista de productos
  } catch (error) {
    console.error('Error obteniendo los productos:', error);
    throw error;
  }
};