import TaskAnswer from '@/components/TaskAnswer/TaskAnswer.component';
import { Button, Flex } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function TaskAnswerPage() {
	const navigate = useNavigate();
	return (
		<Flex direction='column' justify='center'>
			<Button leftSection={<IconArrowBack />} variant='outline' mx='auto' onClick={() => navigate(-1)}>
				Powrót do listy zdań
			</Button>
			<TaskAnswer />
		</Flex>
	);
}

export default TaskAnswerPage;
