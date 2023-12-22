import { getSpecialTaskByIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetSpecialTaskByIdQuery(specialTaskId: number) {
	const query = useQuery({
		queryKey: ['specialTask', specialTaskId],
		queryFn: () => getSpecialTaskByIdQueryFn(specialTaskId),
	});

	return query;
}
