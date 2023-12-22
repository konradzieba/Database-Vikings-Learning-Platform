import { Box, Button, Flex, Text, ThemeIcon } from '@mantine/core';
import { IconClockHour11, IconPencilMinus } from '@tabler/icons-react';
import classes from './Task.card.module.css';
import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';
import DateTimeDisplay from '@/components/UI/DateTimeDisplay';

interface TaskCardProps {
	number: number;
	question: string;
	closeDate: string;
	isMarkdown: boolean;
	isExtra: boolean;
}

function TaskCard({ number, question, closeDate, isMarkdown, isExtra }: TaskCardProps) {
	const { id } = useParams();

	const handleOpenModifyAddedTaskModal = () => {
		modals.openContextModal({
			modal: 'modifyAddedTask',
			title: `Podgląd zadania ${number}`,
			size: 'xl',
			innerProps: {
				modalBody: '',
				groupId: +id!,
				number: number,
				question: question,
				closeDate: closeDate,
				isMarkdown: isMarkdown,
				isExtra: isExtra,
			},
		});
	};

	const splitQuestion = (question: string, isMarkdown: boolean) => {
		if (isMarkdown) {
			return 'Treść zdania jest w formacie Markdown, by zobaczyć pełną treść przejdź do podglądu zadania.';
		} else {
			if (question.length > 125) {
				return question.substring(0, 125) + '....';
			} else {
				return question;
			}
		}
	};

	return (
		<Box className={classes.taskCardContainer}>
			<Flex justify='space-evenly' align='center' h='100%'>
				<ThemeIcon size='lg' radius='sm'>
					<Text fw={500}>{number}</Text>
				</ThemeIcon>
				<Text w='50%'>{splitQuestion(question, isMarkdown)}</Text>
				<DateTimeDisplay date={closeDate} title='Data zakończenia' icon={<IconClockHour11 />} />
				<Button variant='transparent' onClick={handleOpenModifyAddedTaskModal}>
					<Text size='xl' c='var(--font-color)'>
						{<IconPencilMinus size='1.5rem' />}
					</Text>
				</Button>
			</Flex>
		</Box>
	);
}

export default TaskCard;
