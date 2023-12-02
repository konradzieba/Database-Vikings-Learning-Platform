import { getAbsentStudentsQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetAbsentStudentsQuery(lessonId: number | null) {
	const query = useQuery({
		enabled: !!lessonId,
		queryKey: [`absentStudents${lessonId}`, 'absentStudents'],
		queryFn: () => getAbsentStudentsQueryFn(lessonId!),
	});
	return query;
}
