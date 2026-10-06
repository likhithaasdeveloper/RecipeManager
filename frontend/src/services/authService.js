import API from './api';

export const authService = {
  login: async (credentials) => {
    localStorage.clear();
    const response = await API.post('/auth/login', credentials);
    
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }

    const userData = response.data?.user || response.data;
    localStorage.setItem('user', JSON.stringify(userData));

    return response.data;
  },

  register: async (userData) => {
    localStorage.clear();
    const response = await API.post('/auth/register', userData);
    return response.data;
  },

  getCreators: async () => {
    const res = await API.get('/auth/creators');
    return res.data;
  },

  toggleCreatorStatus: async (id) => {
    const res = await API.put(`/auth/creators/${id}/toggle-status`);
    return res.data;
  },

  getUserStatus: async (email) => {
    const res = await API.get(`/auth/user-status?email=${email}`);
    return res.data;
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      const parsed = JSON.parse(userStr);
      return parsed && parsed.email ? parsed : null;
    } catch (e) {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('jwt');
  }
};