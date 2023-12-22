import { sendAnswerMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSendAnswerMutation() {
	const queryClient = useQueryClient();
	const sendAnswerMutation = useMutation({
		mutationFn: sendAnswerMutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['taskFromLesson'] });
		},
	});

	return sendAnswerMutation;
}
