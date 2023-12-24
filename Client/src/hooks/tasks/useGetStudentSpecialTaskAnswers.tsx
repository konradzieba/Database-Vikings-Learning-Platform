import { getStudentSpecialTaskAnswersQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetStudentSpecialTaskAnswersQuery() {
	const query = useQuery({
		queryKey: ['studentSpecialTaskAnswers'],
		queryFn: getStudentSpecialTaskAnswersQueryFn,
	});

	return query;
}
