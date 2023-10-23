import { useMeQuery } from '@/hooks/users/useMeQuery';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useStore } from './store';
import { AxiosError } from 'axios';
import client from './axios';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { APIError, MyAxiosRequestConfig } from '@/types/AxiosInterfaces';

function AuthMiddleware({ children }: PropsWithChildren) {
	const [isSessionExpired, setIsSessionExpired] = useState(false);
	const { setRole } = useStore();
	const { data: userData } = useMeQuery();
	const navigate = useNavigate();

	client.interceptors.response.use(
		response => {
			return response;
		},
		async (error: AxiosError<APIError>) => {
			const originalRequest = error.config as MyAxiosRequestConfig;
			if (error.response?.statusText === 'Unauthorized' && !originalRequest._retry) {
				originalRequest._retry = true;
				await client.post('/auth/refreshToken');
				return client(originalRequest);
			}
			setIsSessionExpired(true);

			return Promise.reject(error);
		}
	);

	useEffect(() => {
		if (isSessionExpired) {
			modals.openContextModal({
				modal: 'sessionExpired',
				title: 'Sesja wygasła',
				innerProps: {
					modalBody: 'Twoja sesja wygasła. Zaloguj się ponownie aby kontynuować',
				},
			});
			navigate('/login');
		}
	}, [isSessionExpired]);

	useEffect(() => {
		if (userData) {
			setRole(userData.role);
		}
	}, [userData]);

	return <>{children}</>;
}

export default AuthMiddleware;
