import { getScoreBoardQueryFn } from '@/utils/axios-queries';
import { useStudentStore } from '@/utils/store';
import { useQuery } from '@tanstack/react-query';

function useGetScoreBoardQuery() {
	const { studentData } = useStudentStore();
	const query = useQuery({
		queryKey: ['scoreBoard', studentData],
		queryFn: () => getScoreBoardQueryFn(),
	});

	return query;
}

export default useGetScoreBoardQuery;
