import axios from 'axios';

const clientAxios = axios.create();

// הוספת Interceptor לכל הבקשות
clientAxios.interceptors.request.use(
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

// הוספת Interceptor לכל התגובות
clientAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default clientAxios;
