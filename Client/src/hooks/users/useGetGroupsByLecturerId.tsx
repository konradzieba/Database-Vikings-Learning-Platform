import { getGroupsByLecturerIdQueryFn } from '@/utils/axios-queries';
import { useLecturerStore } from '@/utils/store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useGetGroupsByLecturerId(lecturerId: number | null) {
	const query = useQuery({
		enabled: !!lecturerId,
		queryKey: ['groups', lecturerId],
		queryFn: () => getGroupsByLecturerIdQueryFn(lecturerId!),
	});


	return query;
}

export default useGetGroupsByLecturerId;
