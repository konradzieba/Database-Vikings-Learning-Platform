import { getStudentLessonsInfoQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetStudentLessonsInfo() {
	const query = useQuery({
		queryFn: getStudentLessonsInfoQueryFn,
		queryKey: ['studentLessonsInfo'],
	});

	return query;
}
