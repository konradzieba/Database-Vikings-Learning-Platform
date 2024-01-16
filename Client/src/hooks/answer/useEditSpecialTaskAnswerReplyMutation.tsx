import { AnswerReplyStatus } from '@/types/Enums';
import { updateSpecialTaskAnswerReplyMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateSpecialTaskAnswerReplyData = {
	grantedScore: number;
	replyStatus: AnswerReplyStatus;
	replyDesc: string;
};

export function useEditSpecialTaskAnswerReplyMutation(
	answerId: number,
	answerReplyData: UpdateSpecialTaskAnswerReplyData
) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => updateSpecialTaskAnswerReplyMutationFn(answerId, answerReplyData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getEditSpecialTaskAnswerReplyData', answerId],
			});
		},
	});

	return mutation;
}
