import { getLessonTaskByIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetLessonTaskById(lessonId: number | null, taskId: number | null) {
	const query = useQuery({
		enabled: !!lessonId && !!taskId,
		queryKey: ['taskFromLesson', lessonId, taskId],
		queryFn: () => getLessonTaskByIdQueryFn(lessonId!, taskId!),
	});

	return query;
}
