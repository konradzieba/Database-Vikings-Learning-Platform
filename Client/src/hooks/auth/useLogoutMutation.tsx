import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutMutationFn } from '@/utils/axios-queries';
import { useUserStore } from '@/utils/stores/useUserStore';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';

export function useLogoutMutation() {
	const navigate = useNavigate();
	const { clearUserStoreData } = useUserStore();
	const { clearStudentStoreData } = useStudentStore();
	const { clearLecturerStoreData } = useLecturerStore();
	const logoutMutation = useMutation({
		mutationFn: logoutMutationFn,
		onSuccess: () => {
			clearLecturerStoreData();
			clearStudentStoreData();
			clearUserStoreData();
			navigate('/login');
		},
		onError: (error: AxiosError) => {
			console.error(error);
		},
	});

	return logoutMutation;
}
