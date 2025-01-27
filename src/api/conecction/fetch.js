import { HttpMethods, findHttpMethod } from "./HttpMethods";

const validateEndpoint = (endpoint) => {
    if (typeof endpoint !== 'string' || !endpoint.trim()) {
        throw new Error('La URL del endpoint es inválida');
    }
};

const validateMethod = (method) => {
    const httpMethod = findHttpMethod(method);
    if (!httpMethod) {
        throw new Error('Método HTTP inválido');
    }
    return httpMethod;
};

const validateStatusExpected = (statusExpected) => {
    if (typeof statusExpected !== 'number' || statusExpected < 100 || statusExpected >= 600) {
        throw new Error('Código de estado HTTP inválido');
    }
};

const validateToken = (token) => {
    if (token && (typeof token !== 'string' || !token.trim())) {
        throw new Error('Token inválido');
    }
};

const buildFetchOptions = (method, data, token) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data && (method === HttpMethods.POST || method === HttpMethods.PUT || method === HttpMethods.PATCH)) {
        options.body = JSON.stringify(data);
    }

    return options;
};

const handleResponse = async (response, statusExpected) => {
    const status = response.status;

    if (status !== statusExpected) {
        try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error en la solicitud: ${response.statusText} (${status})`);
            } else {
                throw new Error(`Error en la solicitud: ${response.statusText} (${status})`);
            }
        } catch (e) {
            throw new Error(`Error en la solicitud: ${response.statusText} (${status})`);
        }
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null;
    }

    return await response.json();
};

export const executeFetch = async (endpoint, data = null, method, token = null, statusExpected) => {
    try {
        validateEndpoint(endpoint);
        const httpMethod = validateMethod(method);
        validateStatusExpected(statusExpected);
        validateToken(token);

        const options = buildFetchOptions(httpMethod, data, token);

        const response = await fetch(endpoint, options);

        return await handleResponse(response, statusExpected);
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('Error de red: No se pudo conectar al servidor');
            throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
        } else {
            console.error('Error en la solicitud:', error);
            throw error;
        }
    }
};