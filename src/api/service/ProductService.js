import axios from 'axios';
import API_URL from '../conecction/config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';
export const createProduct = async (formData,token) => {
  const endpoint = `${API_URL}/product/create`;
    try {
      const response = await axios.post(endpoint, formData, {
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

export const updateStockProductsPurchase = (products,token) =>{
  const endpoint = `${API_URL}/product/update-stock`;
  return executeFetch(endpoint,products,HttpMethods.PATCH,token,200);
  
}