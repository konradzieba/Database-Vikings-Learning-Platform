import { AnswerReplyStatus } from '@/types/Enums';
import { updateAnswerReplyMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateAnswerReplyData = {
	grantedScore: number;
	replyStatus: AnswerReplyStatus;
	replyDesc: string;
};

export function useGetEditAnswerReplyMutation(
	answerId: number,
	answerReplyData: UpdateAnswerReplyData
) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => updateAnswerReplyMutationFn(answerId, answerReplyData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getEditAnswerReplyData', answerId],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return mutation;
}
