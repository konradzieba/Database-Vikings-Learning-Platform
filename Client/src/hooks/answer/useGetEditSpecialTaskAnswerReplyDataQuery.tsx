import { getEditSpecialTaskAnswerReplyQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetEditSpecialTaskAnswerReplyDataQuery(answerId: number) {
	const query = useQuery({
		queryKey: ['getEditSpecialTaskAnswerReplyData', answerId],
		queryFn: () => getEditSpecialTaskAnswerReplyQueryFn(answerId),
	});

	return query;
}
