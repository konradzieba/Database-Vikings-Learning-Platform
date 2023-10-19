import { useMutation } from '@tanstack/react-query';
import { UseFormReturnType } from '@mantine/form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginQueryFn } from '@/utils/axios-queries';

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

	const loginMutation = useMutation({
		mutationFn: loginQueryFn,
		onSuccess: () => {
			navigate('/');
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
