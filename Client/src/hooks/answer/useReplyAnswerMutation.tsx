import { TReplyAnswerRequest } from '@/types/RequestTypes';
import { replyAnswerMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useReplyAnswerMutation(answerId: number, reply: TReplyAnswerRequest) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => replyAnswerMutationFn(answerId, reply),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['studentTasks'] });
		},
	});

	return mutation;
}

export default useReplyAnswerMutation;
