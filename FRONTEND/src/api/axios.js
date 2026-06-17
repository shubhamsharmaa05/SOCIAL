import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  // Update this to your backend's actual URL using environment variables
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach the Auth token to every request
apiClient.interceptors.request.use(
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

// Response interceptor to handle global errors (like session expired)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, you might want to clear token and redirect to login
      localStorage.removeItem('token');
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
