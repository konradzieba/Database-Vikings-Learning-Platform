import { TReply, replyAnswerMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

function useReplyAnswerMutation(answerId: number, reply: TReply) {
	const mutation = useMutation({
		mutationFn: () => replyAnswerMutationFn(answerId, reply),
		onError: (error) => {
			console.error(error);
		},
	});

	return mutation;
}

export default useReplyAnswerMutation;
