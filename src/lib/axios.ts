import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    // TODO: get account id from cookie or somewhere else
    config.headers['X-Account-Id'] = '31381f3817773198dda49083b8167b53';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
