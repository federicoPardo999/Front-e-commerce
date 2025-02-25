import API_URL from '../conecction/config'; 
import { executeFetch } from '../conecction/fetch';
import { HttpMethods } from '../conecction/HttpMethods';

export const sendWelcomeMessage = async (to , username, token) => {
    const welcomeMessageData = {
        to: to,
        subject: "Welcome to our community",
        username: username
    };

    const endpoint = `${API_URL}/email/welcome`;
    
    return await executeFetch(endpoint, welcomeMessageData, HttpMethods.POST, token, 201);
};