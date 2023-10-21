import { useQuery } from '@tanstack/react-query';
import { meQueryFn } from '@/utils/axios-queries';
import { useCookies } from 'react-cookie';
import { useStore } from '@/utils/store';

export function useMeQuery() {
	const [loggedIn] = useCookies(['loggedIn']);
	const { role } = useStore();
	const meQuery = useQuery({
		queryFn: meQueryFn,
		queryKey: ['me', loggedIn],
		enabled: loggedIn && role ? true : false,
		retry: false,
	});

	return meQuery;
}
