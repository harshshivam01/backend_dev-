import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api/auth';

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
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error occurred' };
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
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