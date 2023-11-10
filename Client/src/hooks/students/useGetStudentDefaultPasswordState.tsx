import { getStudentDefaultPasswordStateQueryFn } from '@/utils/axios-queries';
import { useStudentStore } from '@/utils/store';
import { useQuery } from '@tanstack/react-query';

export function useGetStudentDefaultPasswordState() {
	const { studentData } = useStudentStore();
	const query = useQuery({
		enabled: studentData.studentId === null,
		queryKey: ['isDefaultPasswordChanged'],
		queryFn: () => getStudentDefaultPasswordStateQueryFn(),
	});

	return query;
}
