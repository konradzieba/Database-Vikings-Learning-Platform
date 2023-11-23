import { Center } from '@mantine/core';
import { useParams } from 'react-router-dom';

function StudentPreview() {
	const { studentId } = useParams();
	return (
		<Center>
			<h1>
				StudentPreview
				{studentId}
			</h1>
		</Center>
	);
}

export default StudentPreview;
