import { TLoginRequest } from '@/types/RequestTypes';
import { TMessageResponse } from '@/types/ResponseTypes';
import axios from '@/utils/axios';

export const loginQueryFn = async (loginRequest: TLoginRequest) => {
	const { data } = await axios.post<TMessageResponse>(
		'/auth/login',
		loginRequest
	);
	return data;
};

export const logoutQueryFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/logout');
	return data;
};
