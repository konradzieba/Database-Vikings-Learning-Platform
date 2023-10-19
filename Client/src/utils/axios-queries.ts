import { TLoginRequest, TSendAnswerRequest } from '@/types/RequestTypes';
import { TMessageResponse } from '@/types/ResponseTypes';
import axios from '@/utils/axios';

export const loginMutationFn = async (loginRequest: TLoginRequest) => {
	const { data } = await axios.post<TMessageResponse>(
		'/auth/login',
		loginRequest
	);
	return data;
};

export const logoutMutationFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/logout');
	return data;
};

export const sendAnswerMutationFn = async (
	sendAnswerRequest: TSendAnswerRequest
) => {
	const { data } = await axios.post<TMessageResponse>(
		'/answers/createAnswer',
		sendAnswerRequest
	);
	return data;
};
