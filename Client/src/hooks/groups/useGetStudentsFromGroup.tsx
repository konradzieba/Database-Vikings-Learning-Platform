import { getStudentsFromGroupQueryFn } from '@/utils/axios-queries';
import { useLecturerStore } from '@/utils/store';
import { useQuery } from '@tanstack/react-query';

export function useGetStudentsFromGroup(groupId: number | null) {
	const query = useQuery({
		enabled: !!groupId,
		queryKey: [`studentsFromGroup`, groupId],
		queryFn: () => getStudentsFromGroupQueryFn(groupId!),
	});

	return query;
}

export default useGetStudentsFromGroup;
