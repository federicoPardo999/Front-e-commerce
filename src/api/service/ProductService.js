import axios from 'axios';
import API_URL from '../config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';
export const createProduct = async (formData,token) => {
    try {
      const response = await axios.post(`${API_URL}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${token}`,
        },
      })
      ;
      return response;
    } catch (error) {
      console.error('Error creando el producto:', error);
      throw error;
    }
  };
/*endpoint, data = null, methodHttp, token = null, statusExpected*/ 
export const getProducts = async (token) => {
  const endpoint = `${API_URL}/product/get-all`;
  return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};