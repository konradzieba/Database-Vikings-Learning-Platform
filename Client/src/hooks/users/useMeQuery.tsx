import { useQuery } from '@tanstack/react-query';
import { meQueryFn } from '@/utils/axios-queries';
import { useCookies } from 'react-cookie';

export function useMeQuery() {
	const [loggedIn] = useCookies(['loggedIn']);
	const meQuery = useQuery({
		queryFn: meQueryFn,
		queryKey: ['me', loggedIn],
		refetchInterval: 900000,
	});

	return meQuery;
}
