import axios from 'axios';

function getAuthToken(): string | null {
  return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;