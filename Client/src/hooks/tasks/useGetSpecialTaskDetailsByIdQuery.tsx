import { getSpecialTaskDetailsByIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetSpecialTaskDetailsByIdQuery(specialTaskId: number) {
	const query = useQuery({
		queryKey: [`specialTaskDetails-${specialTaskId}`],
		queryFn: () => getSpecialTaskDetailsByIdQueryFn(specialTaskId),
	});

	return query;
}
