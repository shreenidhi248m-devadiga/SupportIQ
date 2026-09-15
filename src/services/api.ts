import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supportiq_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401 & Error Handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear session if unauthorized/token expired
      localStorage.removeItem('supportiq_token');
      localStorage.removeItem('supportiq_user');
      
      // Dispatch custom event so AuthContext updates state gracefully without hard reloads
      window.dispatchEvent(new Event('supportiq_session_expired'));
    }
    return Promise.reject(error);
  }
);

export default api;