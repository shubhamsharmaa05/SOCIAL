import apiClient from '../api/axios';

const authService = {
  // Example: Login User
  login: async (credentials) => {
    // Replace '/api/auth/login' with your actual login endpoint
    const response = await apiClient.post('/api/auth/login', credentials); 
    return response.data;
  },

  // Example: Register User
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  // Get logged-in user profile
  getCurrentUser: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  // Google Login User
  googleLogin: async (profileData) => {
    const response = await apiClient.post('/auth/google', profileData);
    return response.data;
  }
};

export default authService;
