import axios from "axios";

// Set up axios instance with base URL

const AXIOS_BASE_URL = "http://localhost:3020/api/user";

const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
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

const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || '{}');
const isLoggedIn = () => !!getToken();
const isAdmin = () => getUser()?.role === 'admin';
const getUserId = () => {
    try {
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error('No user data found in localStorage');
            return null;
        }
        
        const user = JSON.parse(userData);
        console.log('Retrieved user data:', user);
        
        if (!user.id) {
            console.error('No ID found in user data');
            return null;
        }
        
        return user.id;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
};

export const authService = {
  login: async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        console.log('Raw login response:', response.data);
        
        if (response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            
            // Ensure we have the user ID
            if (!response.data.user.id && !response.data.user._id) {
                throw new Error('User ID missing from response');
            }
            
            const userData = {
                id: response.data.user.id || response.data.user._id,
                username: response.data.user.username,
                role: response.data.user.role,
                fullname: response.data.user.fullname,
                email: response.data.user.email
            };
            
            console.log('Storing user data:', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return response.data;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
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
    localStorage.removeItem('user');
  },
  getAllRestaurants: async () => {
    const response = await axiosInstance.get('/restaurants');
    return response.data;
  },
  getToken,
  getUser,
  isLoggedIn,
  isAdmin,
  getUserId
};