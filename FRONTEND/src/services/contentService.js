import apiClient from '../api/axios';

const contentService = {
  // Example: Get all posts
  getPosts: async () => {
    // Replace '/api/posts' with your actual endpoint
    const response = await apiClient.get('/api/posts'); 
    return response.data;
  },

  // Example: Create a new post
  createPost: async (postData) => {
    const response = await apiClient.post('/api/posts', postData);
    return response.data;
  },

  // Example: Get a specific post by ID
  getPostById: async (id) => {
    const response = await apiClient.get(`/api/posts/${id}`);
    return response.data;
  },

  // Example: Delete a post
  deletePost: async (id) => {
    const response = await apiClient.delete(`/api/posts/${id}`);
    return response.data;
  }
};

export default contentService;
