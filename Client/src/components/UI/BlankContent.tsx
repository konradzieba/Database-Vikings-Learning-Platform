import { useMeQuery } from '@/hooks/users/useMeQuery';
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';

function BlankContent() {
	const { data: userData, isSuccess, isLoading } = useMeQuery();
	const [isLogged, setIsLogged] = useState(false);
	useEffect(() => {
		setIsLogged(isSuccess);
	}, [isSuccess]);

	console.log(userData);

	return (
		<>
			{isLoading ? (
				<Loader size='lg' />
			) : (
				<pre>
					{isLogged ? JSON.stringify(userData, null, 2) : 'Not logged in'}
				</pre>
			)}
		</>
	);
}

export default BlankContent;
