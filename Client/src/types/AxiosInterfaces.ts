import { AxiosRequestConfig } from "axios";

export interface MyAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

export interface APIError {
	detail: string;
}
