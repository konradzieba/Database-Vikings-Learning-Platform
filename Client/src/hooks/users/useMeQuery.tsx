import { useQuery } from '@tanstack/react-query';
import { meQueryFn } from '@/utils/axios-queries';

export function useMeQuery() {
	const meQuery = useQuery({
		queryFn: meQueryFn,
		queryKey: ['me'],
	});

	return meQuery;
}
