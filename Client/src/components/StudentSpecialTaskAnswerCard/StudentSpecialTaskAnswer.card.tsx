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
	studentId: number;
	isScoreGranted: boolean
}

function StudentSpecialTaskAnswerCard({
	index,
	firstName,
	lastName,
	sendDate,
	answerId,
  answer,
	isScoreGranted,
	studentId,
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

	const openEditSpecialTaskAnswerReplyModal = () => {
		modals.openContextModal({
			modal: 'editSpecialTaskAnswerReply',
			title: 'Koryguj ocenę zadania specjalnego',
			size: 'lg',
			closeOnClickOutside: false,
			// onClose: 
			innerProps: {
				answerId,
				studentId,
				studentFullName: `${firstName} ${lastName}`,
				studentIndex: index
			}
		})
	}

	const handleButtonClick = () => {
		if(!isScoreGranted) {
			handlePreviewStudentSpecialAnswer();
		} else {
			openEditSpecialTaskAnswerReplyModal();
		}
	}

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
			<Button miw={150} onClick={handleButtonClick} className={classes.answerCardButton}>
				{isScoreGranted ? 'Koryguj' : 'Przejdź'}
			</Button>
		</Flex>
	);
}

export default StudentSpecialTaskAnswerCard;
