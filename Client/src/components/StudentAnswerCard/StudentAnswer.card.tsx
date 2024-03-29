import { Box, Button, Flex, Text } from '@mantine/core';
import classes from './StudentAnswer.card.module.css';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import { IconClock } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

interface StudentAnswerCardProps {
	studentId: number;
	answerId: number;
	firstName: string;
	lastName: string;
	index: number;
	answer: string;
	sendDate: string;
	isScoreGranted: boolean;
	refetchLessonInfo?: () => void;
}

function StudentAnswerCard({
	studentId,
	answerId,
	firstName,
	lastName,
	index,
	answer,
	isScoreGranted,
	sendDate,
	refetchLessonInfo,
}: StudentAnswerCardProps) {
	const openCreateAnswerReplyModal = () => {
		modals.openContextModal({
			modal: 'createAnswerReply',
			title: 'Oceń zadanie',
			size: 'lg',
			closeOnClickOutside: false,
			onClose: refetchLessonInfo,
			innerProps: {
				studentId,
				answerId,
				studentFullName: `${firstName} ${lastName}`,
				studentIndex: index,
				studentAnswer: answer,
			},
		});
	};

	const openEditAnswerReplyModal = () => {
		modals.openContextModal({
			modal: 'editAnswerReply',
			title: 'Koryguj ocenę zadania',
			size: 'lg',
			closeOnClickOutside: false,
			onClose: refetchLessonInfo,
			innerProps: {
				answerId,
				studentId,
				studentFullName: `${firstName} ${lastName}`,
				studentIndex: index,
			},
		});
	};

	const handleButtonClick = () => {
		if (!isScoreGranted) {
			openCreateAnswerReplyModal();
		} else {
			openEditAnswerReplyModal();
		}
	};

	return (
		<Flex
			direction='column'
			px='md'
			py='md'
			gap='md'
			miw='22%'
			className={classes.answerCardWrapper}
		>
			<Box>
				<Text fw={500} fz='lg'>
					{index}
				</Text>
				<Text className={classes.answerCardFullName}>
					{firstName} {lastName}
				</Text>
			</Box>
			<DateTimeDisplay
				title='Data zwrócenia'
				date={sendDate}
				icon={<IconClock />}
			/>
			<Button
				miw={150}
				onClick={handleButtonClick}
				className={classes.answerCardButton}
			>
				{isScoreGranted ? 'Koryguj' : 'Przejdź'}
			</Button>
		</Flex>
	);
}

export default StudentAnswerCard;
