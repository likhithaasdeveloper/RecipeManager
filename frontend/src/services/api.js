import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// 1. REQUEST INTERCEPTOR: Inject Bearer JWT Token into outgoing request headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR: Catch global server errors & token expiry
API.interceptors.response.use(
  (response) => response, // Pass successful responses straight through
  (error) => {
    const status = error.response ? error.response.status : null;

    // Handle 401 Unauthorized (Expired or invalid token) or 403 Forbidden
    if (status === 401 || status === 403) {
      console.warn('Session expired or unauthorized. Clearing session...');
      localStorage.clear();
      
      // Redirect to login page if user is not already on login/register
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login?expired=true'; // Redirect to login with query param indicating session expiry
      }
    }

    return Promise.reject(error);
  }
);

export default API;