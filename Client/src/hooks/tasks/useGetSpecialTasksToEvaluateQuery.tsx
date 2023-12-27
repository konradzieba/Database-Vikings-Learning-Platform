import { getSpecialTasksToEvaluateQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetSpecialTasksToEvaluateQuery() {
	const query = useQuery({
		queryKey: ['specialTasksToEvaluate'],
		queryFn: getSpecialTasksToEvaluateQueryFn,
	});

	return query;
}
