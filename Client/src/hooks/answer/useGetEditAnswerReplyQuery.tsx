import { getEditAnswerReplyQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetEditAnswerReplyDataQuery(answerId: number) {
	const query = useQuery({
		queryKey: ['getEditAnswerReplyData', answerId],
		queryFn: () => getEditAnswerReplyQueryFn(answerId),
	});

	return query;
}
