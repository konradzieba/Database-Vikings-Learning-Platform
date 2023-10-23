import { useMeQuery } from '@/hooks/users/useMeQuery';
import { PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { refreshTokenQueryFn } from './axios-queries';
import { Navigate } from 'react-router-dom';
import { useStore } from './store';

function AuthMiddleware({ children }: PropsWithChildren) {
	const { setRole } = useStore();
	const { data: userData } = useMeQuery();
	const { status } = useQuery({
		queryKey: ['test'],
		queryFn: refreshTokenQueryFn,
		enabled: !userData,
	});
	useEffect(() => {
		if (userData) {
			setRole(userData.role);
		}
	}, [userData]);

	// if (status === 'error') {
	// 	return <Navigate to='/login' />;
	// }

	return <>{children}</>;
}

export default AuthMiddleware;
