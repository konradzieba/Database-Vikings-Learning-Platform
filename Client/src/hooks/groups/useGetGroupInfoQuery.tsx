import { getGroupInfoQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetGroupInfoQuery(groupId: number | null) {
	const query = useQuery({
		enabled: !!groupId,
		queryKey: [`groupInfo${groupId}`, groupId],
		queryFn: () => getGroupInfoQueryFn(groupId!),
	});

	return query;
}

export default useGetGroupInfoQuery;
