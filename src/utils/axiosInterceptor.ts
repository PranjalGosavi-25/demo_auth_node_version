import axios from 'axios';
import config from '@config';
import { fetcher } from './fetcher';

const refreshUrl = `${config.BACKEND_URL.AUTH_SERVICE}/auth/refreshToken`;

// axios.interceptors.request.use((config) => {
//   config.withCredentials = true;

//   return config;
// });

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url !== refreshUrl &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const { error: refreshError } = await fetcher({
        url: refreshUrl
      });

      if (refreshError) {
        return Promise.reject(error);
      }

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
