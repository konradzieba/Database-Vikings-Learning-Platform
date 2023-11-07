import { useQuery } from '@tanstack/react-query';
import { getLessonInfoByGroupAndLessonIdQueryFn } from '@/utils/axios-queries';

export function useGetLessonInfoByGroupAndLessonIdQueryFn(
	groupId: number | null,
	lessonId: number | null
) {
	const query = useQuery({
		enabled: !!groupId && !!lessonId,
		queryKey: ['lessonInfo', groupId, lessonId],
		queryFn: () => getLessonInfoByGroupAndLessonIdQueryFn(groupId!, lessonId!),
	});

	return query;
}
