import { getPreDeleteGroupInfoQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetPreDeleteGroupInfo(groupId: number) {
	return useQuery({
		queryKey: ['preDeleteGroupInfo', `preDeleteGroupInfo-${groupId}`],
		queryFn: () => getPreDeleteGroupInfoQueryFn(groupId),
	});
}
