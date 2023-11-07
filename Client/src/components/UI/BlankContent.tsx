import { useMeQuery } from '@/hooks/users/useMeQuery';
import { useLecturerStore, useStudentStore, useUserStore } from '@/utils/store';
import { Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';

function BlankContent() {
	const { data: userData, isSuccess, isLoading } = useMeQuery();
	const [isLogged, setIsLogged] = useState(false);
	const { role } = useUserStore();
	const { studentData } = useStudentStore();
	const { lecturerData } = useLecturerStore();

	useEffect(() => {
		setIsLogged(isSuccess);
	}, [isSuccess]);


	return (
		<>
			{isLoading ? (
				<Loader size='lg' />
			) : (
				<pre>
					{isLogged ? JSON.stringify(userData, null, 2) : 'Not logged in'}
				</pre>
			)}
			<Button onClick={() => console.log(role)}>Wyświetl role</Button>
			<Button onClick={() => console.log(studentData)}>
				Wyświetl studentStore
			</Button>
			<Button onClick={() => console.log(lecturerData)}>
				Wyświetl lecturerStore
			</Button>
		</>
	);
}

export default BlankContent;
