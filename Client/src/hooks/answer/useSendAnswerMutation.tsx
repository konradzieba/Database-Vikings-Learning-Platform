import { sendAnswerMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useSendAnswerMutation() {
	const sendAnswerMutation = useMutation({
		mutationFn: sendAnswerMutationFn,
		onSuccess: () => {
			console.log('wysłano odpowiedź');
		},
		onError: (error: AxiosError) => {
			console.error(error);
		},
	});

	return sendAnswerMutation;
}
