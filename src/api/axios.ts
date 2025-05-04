export const API_URL = 'http://tochkaszapyatoi.ru :8081/api/v1/management/';
export const BASE_API_URL = 'http://tochkaszapyatoi.ru :8081/api/v1/';
export const AUTH_API_URL = 'http://tochkaszapyatoi.ru :8080/api/v1/';


const getHeaders = (isFormData = false) => {
    const headers: HeadersInit = {};
    const token = localStorage.getItem('adminToken');
    
    if (token) {
        headers['X-MANAGEMENT-API'] = token;
    }
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return headers;
};

export const fetchManagement = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: getHeaders(options.body instanceof FormData),
    });

    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/auth';
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return null;
};

export const fetchBase = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_API_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return null;
}; 

export const fetchAuth = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${AUTH_API_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return null;
}; 