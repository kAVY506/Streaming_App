import axios from 'axios';

const API_URL = 'http://localhost:7000';

// Axios instance for authenticated requests
const api = axios.create({
  baseURL: API_URL,
});

// Include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Attach Authorization token if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'; 
  }

  return config;
});

// API functions

// User authentication
export const login = (email, password) => api.post('/api/auth/login', { email, password });
export const register = (username, email, password) => api.post('/api/auth/register', { username, email, password });

// Upload video - FormData automatically sets Content-Type to multipart/form-data
export const uploadVideo = (formData) => api.post('/api/videos/upload', formData);

// Fetch list of videos with pagination and search functionality
export const fetchVideos = (search = '', page = 1) => {
    return axios.get(`${API_URL}/api/videos?search=${encodeURIComponent(search)}&page=${page}`);
  };
  

  export const streamVideo = async (id) => {
    const { data } = await axios.get(`${API_URL}/api/videos/stream/${id}`);
    return data.videoUrl; // Return the full video URL from the backend response
  };
  