import { getLessonsByGroupIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetLessonsByGroupId(groupId: number | null) {
	const query = useQuery({
		enabled: !!groupId,
		queryKey: [groupId],
		queryFn: () => getLessonsByGroupIdQueryFn(groupId!),
	});

	return query;
}

