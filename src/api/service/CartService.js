import API_URL from '../config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';

export const addProductToCart = async (token,idProduct,quantity) =>{
    const endpoint = `${API_URL}/cart/add`;
    console.log(token,idProduct,quantity);
    const formData = {
        quantity,
        idProduct  
    };
   

    return await executeFetch(endpoint, formData, HttpMethods.POST, token, 201);
}
