import API_URL from '../conecction/config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';


export const buyCart = async (token) =>{
    const endpoint = `${API_URL}/order/create`;
    
   return await executeFetch(endpoint,null,HttpMethods.POST,token,201) 
}

export const getPurchases = async (token) => {
    const endpoint = `${API_URL}/order/get-orders`;

    return executeFetch(endpoint,null,HttpMethods.GET,token,200);
}   