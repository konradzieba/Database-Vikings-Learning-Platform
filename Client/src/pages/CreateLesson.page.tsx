import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function CreateLessonPage() {
	const navigate = useNavigate();

	const handleCreateLesson = () => {
		console.log('Tworzenie lekcji bez sprawdzania obecności');
	};

	const handleCreateLessonAndCheckFrequency = () => {
		console.log('Tworzenie lekcji i sprawdzenie obecności');
		navigate('/dashboard/group/1/lessons/checkFrequency');
	};

	return (
		<Center>
			<Stack align='center'>
				<Text>Tworzenie lekcji</Text>
				<Group>
					<Button variant='outline' onClick={handleCreateLesson}>
						Stwórz
					</Button>
					<Button onClick={handleCreateLessonAndCheckFrequency}>Stwórz i sprawdz obecność</Button>
				</Group>
			</Stack>
		</Center>
	);
}

export default CreateLessonPage;
