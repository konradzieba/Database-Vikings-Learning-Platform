import { useQuery } from '@tanstack/react-query';
import { meQueryFn } from '@/utils/axios-queries';
import { useCookies } from 'react-cookie';

export function useMeQuery() {
	const [cookies] = useCookies(['loggedIn']);
	const meQuery = useQuery({
		queryFn: meQueryFn,
		queryKey: ['me', cookies.loggedIn],
		refetchInterval: 900000,
	});

	return meQuery;
}
