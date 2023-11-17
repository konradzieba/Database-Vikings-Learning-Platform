import { getGroupsByLecturerIdQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetGroupsByLecturerId(lecturerId: number | null) {
	const query = useQuery({
		enabled: !!lecturerId,
		queryKey: ['groups', lecturerId],
		queryFn: () => getGroupsByLecturerIdQueryFn(lecturerId!),
	});

	return query;
}

export default useGetGroupsByLecturerId;
