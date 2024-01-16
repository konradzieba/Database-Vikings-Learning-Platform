import { useMutation } from '@tanstack/react-query';
import { UseFormReturnType } from '@mantine/form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginMutationFn } from '@/utils/axios-queries';
import { UserRoleEnum } from '@/types/Enums';
import { useUserStore } from '@/utils/stores/useUserStore';

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
	const { setRole } = useUserStore();

	const loginMutation = useMutation({
		mutationFn: loginMutationFn,
		onSuccess: ({ role }) => {
			if (role === UserRoleEnum.Enum.STUDENT) {
				setRole(role);
				navigate('/');
			}
			if (
				role === UserRoleEnum.Enum.LECTURER ||
				role === UserRoleEnum.Enum.SUPERUSER
			) {
				setRole(role);
				navigate('/dashboard');
			}
		},
		onError: (error: AxiosError) => {
			if (error.response?.status === 401 || error.response?.status === 400) {
				form.setFieldError('password', 'Nieprawidłowy email lub hasło');
			} else {
				form.setFieldError('password', 'Wystąpił błąd po stronie serwera');
			}
		},
	});

	return loginMutation;
}
