import { TReplyAnswerRequest } from '@/types/RequestTypes';
import { specialTaskAnswerReplyMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useSpecialTaskAnswerReplyMutation(answerId: number, reply: TReplyAnswerRequest) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => specialTaskAnswerReplyMutationFn(answerId, reply),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['specialTasksToEvaluate'] });
		},
	});

	return mutation;
}

export default useSpecialTaskAnswerReplyMutation;
