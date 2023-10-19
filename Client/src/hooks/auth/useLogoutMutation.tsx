import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { logoutMutationFn } from '@/utils/axios-queries';

export function useLogoutMutation() {
	const navigate = useNavigate();
	const logoutMutation = useMutation({
		mutationFn: logoutMutationFn,
		onSuccess: () => {
			navigate('/login');
		},
		onError: (error: AxiosError) => {
			console.error(error);
		},
	});

	return logoutMutation;
}
