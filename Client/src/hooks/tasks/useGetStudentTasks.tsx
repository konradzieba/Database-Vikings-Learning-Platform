import { getStudentTasksQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

function useGetStudentTasksQuery(groupId: number) {
	const query = useQuery({
		queryKey: ['studentTasks', groupId],
		queryFn: () => getStudentTasksQueryFn(groupId),
	});

	return query;
}

export default useGetStudentTasksQuery;
