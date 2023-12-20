import { getStudentPreviewDataQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetStudentPreviewDataQuery(studentId: number) {
	const query = useQuery({
		queryKey: ['studentPreview', studentId],
		queryFn: () => getStudentPreviewDataQueryFn(studentId),
	});

	return query;
}
