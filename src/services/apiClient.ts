import axios from "axios";

const apiUrl = import.meta.env.VITE_REST_API_BASE_URL;

console.log(apiUrl)


export const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Or fetch from context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);