import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:5050/api/todo';

const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${authService.getToken()}`
    }
});

export const todoService = {
    getAllTodos: async () => {
        const response = await axios.get(API_BASE_URL, getAuthHeaders());
        return response.data;
    },

    createTodo: async (todo) => {
        const response = await axios.post(API_BASE_URL, todo, getAuthHeaders());
        return response.data;
    },

    updateTodo: async (todo) => {
        const response = await axios.patch(`${API_BASE_URL}/${todo._id}`, todo, getAuthHeaders());
        return response.data;
    },

    deleteTodo: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeaders());
        return response.data;
    }
}; 