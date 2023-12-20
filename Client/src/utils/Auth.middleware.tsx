import { useMeQuery } from '@/hooks/users/useMeQuery';
import { PropsWithChildren, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import client from './axios';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { APIError, MyAxiosRequestConfig } from '@/types/AxiosInterfaces';
import { useUserStore } from './stores/useUserStore';
import { useStudentStore } from './stores/useStudentStore';
import { useLecturerStore } from './stores/useLecturerStore';

function AuthMiddleware({ children }: PropsWithChildren) {
	const { setRole, setUserData } = useUserStore();
	const { setStudentData } = useStudentStore();
	const { setLecturerData } = useLecturerStore();

	const { data: userData, refetch } = useMeQuery();
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
			refetch();
			setRole(userData.role);
			setUserData({
				userId: userData.id,
				email: userData.email,
				firstName: userData.firstName,
				lastName: userData.lastName,
			});
			if (userData.studentInfos) {
				setStudentData({
					studentId: userData.studentInfos.studentId,
					indexNumber: userData.studentInfos.indexNumber,
					score: userData.studentInfos.score,
					health: userData.studentInfos.health,
					// rank: userData.studentInfos.rank,
					isPasswordChanged: userData.studentInfos.isPasswordChanged,
					groupId: userData.studentInfos.groupId,
					answersIds: userData.studentInfos.answersId,
				});
			}
			if (userData.lecturerInfos) {
				setLecturerData({
					lecturerId: userData.lecturerInfos.lecturerId,
					isAdmin: userData.lecturerInfos.isAdmin,
					idCheck: userData.lecturerInfos.idCheck,
				});
			}
		}
	}, [userData]);

	return <>{children}</>;
}

export default AuthMiddleware;
