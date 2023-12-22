import { getSpecialTasksQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetSpecialTasksQuery(lecturerId: number) {
	const query = useQuery({
		queryKey: ['specialTasks', lecturerId],
		queryFn: () => getSpecialTasksQueryFn(lecturerId),
	});

	return query;
}
