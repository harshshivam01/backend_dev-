import axios from "axios";
import { authService } from "./authuser";
const AXIOS_BASE_URL='http://localhost:3020/api/menu';

const axiosInstance=axios.create({
    baseURL:AXIOS_BASE_URL,
    withCredentials:true,  // for storing session cookies
    headers:{
        'Content-Type':'application/json'
    }
})

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const menuService={
    
    addMenuItem: async(itemData)=>{
        try{
            const userId = authService.getUserId();
            if (!userId) {
                throw new Error('User ID is required');
            }
            console.log('Adding item with userId:', userId);
            const response = await axiosInstance.post(`/${userId}`, {
                ...itemData,
                resId: userId
            });
            console.log('Add item response:', response.data);
            return response.data;
        }catch(error){
            console.error('Error adding menu item:', error.response || error);
            throw error;
        }
    },
    
    getMenuItems: async(userId="") => {
        try {
            if (!userId) {
                throw new Error('User ID is required');
            }
            console.log('Fetching items for userId:', userId);
            const response = await axiosInstance.get(`/${userId}`);
            console.log('Get items response:', response.data);
            if (!response.data || !response.data.food) {
                throw new Error('Invalid response format');
            }
            return response.data;
        } catch(error) {
            console.error('Error fetching menu items:', error.response || error);
            throw error;
        }
    },
    updateMenuItem: async(itemId, updatedItemData)=>{
        try{
            const response = await axiosInstance.patch(`/item/${itemId}`, updatedItemData);
            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error updating menu item:', error);
            throw error;
        }
    },
    deleteMenuItem: async(itemId)=>{
        try{
            const response = await axiosInstance.delete(`/item/${itemId}`);
            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error deleting menu item:', error);
            throw error;
        }
    }


}

