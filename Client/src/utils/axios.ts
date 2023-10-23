import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const client = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

interface MyAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

interface APIError {
	detail: string;
}

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError<APIError>) => {
		const originalRequest = error.config as MyAxiosRequestConfig;
		const errorMessage = error.response?.data.detail as string;
		if (errorMessage.includes('Unauthorized') && !originalRequest._retry) {
			originalRequest._retry = true;
			await axios.post('/auth/refreshToken');
			return axios(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default client;
