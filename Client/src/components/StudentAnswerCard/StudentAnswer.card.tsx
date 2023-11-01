import { Box, Button, Flex, Text } from '@mantine/core';
import classes from './StudentAnswer.card.module.css';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import { IconClock } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

interface StudentAnswerCardProps {
	firstName: string;
	lastName: string;
	index: number;
	answer: string;
	sendDate: string;
}

function StudentAnswerCard({ firstName, lastName, index, answer, sendDate }: StudentAnswerCardProps) {
	const handlePreviewStudentAnswer = () => {
		modals.openContextModal({
			modal: 'previewStudentAnswer',
			title: 'Oceń zadanie',
			size: 'lg',
			closeOnClickOutside: false,
			innerProps: {
				studentFullName: `${firstName} ${lastName}`,
				studentIndex: index,
				studentAnswer: answer,
			},
		});
	};

	return (
		<Flex direction='column' px='md' py='md' gap='md' miw='22%' className={classes.answerCardWrapper}>
			<Box>
				<Text fw={500} fz='lg'>
					{index}
				</Text>
				<Text className={classes.answerCardFullName}>
					{firstName} {lastName}
				</Text>
			</Box>
			<DateTimeDisplay title='Data zwrócenia' date={sendDate} icon={<IconClock />} titleTextAlgin='start' />
			<Button miw={150} onClick={handlePreviewStudentAnswer} className={classes.answerCardButton}>
				Przejdź
			</Button>
		</Flex>
	);
}

export default StudentAnswerCard;