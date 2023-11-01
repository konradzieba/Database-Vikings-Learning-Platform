import { useMeQuery } from '@/hooks/users/useMeQuery';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useStudentStore, useUserStore } from './store';
import { AxiosError } from 'axios';
import client from './axios';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { APIError, MyAxiosRequestConfig } from '@/types/AxiosInterfaces';

function AuthMiddleware({ children }: PropsWithChildren) {
	const { setRole } = useUserStore();
	const { setStudentData } = useStudentStore();
	const { data: userData } = useMeQuery();
	const navigate = useNavigate();

	const [isSessionExpired, setIsSessionExpired] = useState(false);

	client.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error: AxiosError<APIError>) => {
			const originalRequest = error.config as MyAxiosRequestConfig;
			if (
				error.response?.statusText === 'Unauthorized' &&
				!originalRequest._retry
			) {
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
					modalBody:
						'Twoja sesja wygasła. Zaloguj się ponownie aby kontynuować',
				},
			});
			navigate('/login');
		}
	}, [isSessionExpired]);

	useEffect(() => {
		if (userData) {
			setRole(userData.role);
			if (userData.studentInfos) {
				setStudentData({
					userId: userData.id,
					email: userData.email,
					firstName: userData.firstName,
					lastName: userData.lastName,
					studentId: userData.studentInfos.studentId,
					indexNumber: userData.studentInfos.indexNumber,
					score: userData.studentInfos.score,
					health: userData.studentInfos.health,
					rank: userData.studentInfos.rank,
					// groupId: userData.studentInfos.groupId,
					// answersIds: userData.studentInfos.answersIds,
				});
			}
		}
	}, [userData]);

	return <>{children}</>;
}

export default AuthMiddleware;
