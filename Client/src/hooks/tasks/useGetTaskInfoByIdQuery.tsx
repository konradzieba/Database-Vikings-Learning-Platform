import { getTaskInfoByIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

function getTaskInfoByIdQuery(taskId: number) {
	const query = useQuery({
		enabled: !!taskId,
		queryKey: ['taskInfo', taskId],
		queryFn: () => getTaskInfoByIdQueryFn(taskId),
	});

	return query;
}

export default getTaskInfoByIdQuery;
