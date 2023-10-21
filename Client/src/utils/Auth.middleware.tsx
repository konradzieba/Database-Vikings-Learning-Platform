import { useMeQuery } from '@/hooks/users/useMeQuery';
import { PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { refreshTokenQueryFn } from './axios-queries';
import { Navigate } from 'react-router-dom';

function AuthMiddleware({ children }: PropsWithChildren) {
	const { data: userData } = useMeQuery();
	const { status } = useQuery({
		queryKey: ['test'],
		queryFn: refreshTokenQueryFn,
		enabled: !userData,
		retry: false,
	});

	if (status === 'error') {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
}

export default AuthMiddleware;
