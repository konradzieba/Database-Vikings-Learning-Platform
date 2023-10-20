import { useMutation } from '@tanstack/react-query';
import { UseFormReturnType } from '@mantine/form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginMutationFn } from '@/utils/axios-queries';
import { UserRole } from '@/types/Enums';
import { useStore } from '@/utils/store';

interface LoginMutationProps {
	form: UseFormReturnType<
		{
			email: string;
			password: string;
		},
		(values: { email: string; password: string }) => {
			email: string;
			password: string;
		}
	>;
}

export function useLoginMutation({ form }: LoginMutationProps) {
	const navigate = useNavigate();
	const { role: roleFromStore, setRole } = useStore();

	const loginMutation = useMutation({
		mutationFn: loginMutationFn,
		onSuccess: ({ role }) => {
			if (role === UserRole.STUDENT) {
				setRole(role);
				console.log(roleFromStore);
				navigate('/');
			}
			if (role === UserRole.LECTURER || role === UserRole.SUPERUSER) {
				setRole(role);
				console.log(roleFromStore);
				navigate('/dashboard');
			}
		},
		onError: (error: AxiosError) => {
			console.error(error);
			if (error.response?.status === 401 || error.response?.status === 400) {
				form.setFieldError('password', 'Nieprawidłowy email lub hasło');
			} else {
				form.setFieldError('password', 'Wystąpił błąd po stronie serwera');
			}
		},
	});

	return loginMutation;
}
