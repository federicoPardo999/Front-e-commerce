import API_URL from '../conecction/config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';

export const addProductToCart = async (token,productId,quantityBuyStock) =>{
    const endpoint = `${API_URL}/cart/add`;
    const requestData = {
        quantityBuyStock,
        productId  
    };
   
    return await executeFetch(endpoint, requestData, HttpMethods.POST, token, 201);
}

export const getProductsCart = async (token) =>{
    const endpoint = `${API_URL}/cart`;
    
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
}

export const updateStockProduct = async (token,productId,quantityBuyStock) =>{
    const endpoint = `${API_URL}/cart/update-stock`;

    const requestData = {
        quantityBuyStock,
        productId  
    };
   
    return await executeFetch(endpoint, requestData, HttpMethods.PATCH, token, 200);
}