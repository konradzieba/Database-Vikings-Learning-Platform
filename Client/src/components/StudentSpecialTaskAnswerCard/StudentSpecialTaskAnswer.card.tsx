import { Box, Button, Flex, Text } from '@mantine/core';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import { IconClock } from '@tabler/icons-react';
import classes from './StudentSpecialTaskAnswer.card.module.css';
import { modals } from '@mantine/modals';

interface StudentSpecialTaskAnswerCardProps {
	index: number;
	firstName: string;
	lastName: string;
	sendDate: string;
	answerId: number;
  answer: string;
}

function StudentSpecialTaskAnswerCard({
	index,
	firstName,
	lastName,
	sendDate,
	answerId,
  answer
}: StudentSpecialTaskAnswerCardProps) {
	const handlePreviewStudentSpecialAnswer = () => {
		modals.openContextModal({
			modal: 'previewStudentSpecialAnswer',
			title: 'Oceń zadanie specjalne',
			size: 'lg',
			closeOnClickOutside: false,
			innerProps: {
				studentFullName: `${firstName} ${lastName}`,
        studentIndex: index,
        studentAnswer: answer,
        answerId: answerId,
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
					{firstName}&nbsp;{lastName}
				</Text>
			</Box>
			<DateTimeDisplay title='Data zwrócenia' date={sendDate} icon={<IconClock />} />
			<Button miw={150} onClick={handlePreviewStudentSpecialAnswer} className={classes.answerCardButton}>
				Przejdź
			</Button>
		</Flex>
	);
}

export default StudentSpecialTaskAnswerCard;
