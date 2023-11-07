import { getTasksByLessonIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetTasksByLessonId(lessonId: number | null) {
	const query = useQuery({
		enabled: !!lessonId,
		queryKey: ['tasksFromLesson', lessonId],
		queryFn: () => getTasksByLessonIdQueryFn(lessonId!),
	});

	return query;
}
