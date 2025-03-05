import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api/v1/1/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
