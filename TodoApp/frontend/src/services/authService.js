import axios from 'axios';

const API_BASE_URL = 'https://backend-dev-r0xz.onrender.com/api/auth';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authService = {
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            if (response.data.token) {
                if (typeof response.data.token !== 'string' || !response.data.token.length) {
                    throw new Error('Invalid token received');
                }
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            if (error.message === 'Invalid token received') {
                throw { message: 'Authentication failed: Invalid token' };
            }
            throw error.response?.data || { message: 'Network error occurred' };
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/register', userData);
            if (response.data.token) {
                if (typeof response.data.token !== 'string' || !response.data.token.length) {
                    throw new Error('Invalid token received');
                }
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            if (error.message === 'Invalid token received') {
                throw { message: 'Registration failed: Invalid token' };
            }
            throw error.response?.data || { message: 'Network error occurred' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    }
}; 

