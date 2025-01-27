import API_URL from '../config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';


export const login = async (formData) => {
    const endpoint = `${API_URL}/auth/login`;
    return await executeFetch(endpoint, formData, HttpMethods.POST, null, 200);
};

export const register = async (formData) => {
    const endpoint = `${API_URL}/auth/register`;
    return await executeFetch(endpoint, formData, HttpMethods.POST, null, 201);
};  