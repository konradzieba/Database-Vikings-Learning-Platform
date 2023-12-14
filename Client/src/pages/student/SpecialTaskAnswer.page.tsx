import { Button, Flex, Text } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function SpecialTaskAnswerPage() {
	const navigate = useNavigate();

	return (
		<Flex w='80%' mx='auto'>
			<Button leftSection={<IconArrowBack />} variant='outline' mx='auto' onClick={() => navigate('/')}>
				Powrót do strony głównej
			</Button>
		</Flex>
	);
}

export default SpecialTaskAnswerPage;
