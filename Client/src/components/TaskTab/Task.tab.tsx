import { Box, Flex, Overlay, Text, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconClockHour4, IconLock } from '@tabler/icons-react';
import classes from './Task.tab.module.css';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface TaskTabProps {
	lessonId: number;
	taskId: number;
	taskNumber: number;
	taskQuestion: string;
	closeDate: string;
	answerSend: boolean;
	isMarkdown: boolean;
}

function TaskTab({
	lessonId,
	taskId,
	taskNumber,
	taskQuestion,
	closeDate,
	answerSend,
	isMarkdown,
}: TaskTabProps) {
	const navigate = useNavigate();
	const spliceQuestion = (question: string) => {
		if (question.length > 200) {
			return question.substring(0, 200) + '...';
		} else {
			return question;
		}
	};
	const isTaskExpired =
		dayjs(dayjs().toDate()).isAfter(closeDate, 'minutes') && !answerSend;

	return (
		<Box
			tabIndex={1}
			onClick={() => navigate(`/task/${lessonId}/${taskId}`)}
			pos='relative'
			w={rem(800)}
		>
			{isTaskExpired && (
				<Overlay backgroundOpacity={0.85} className={classes.overlayContainer}>
					<Flex h='100%' justify='center' align='center' gap='md'>
						<IconLock color='var(--mantine-color-dimmed)' size='1.75rem' />
						<Text c='dimmed' fz='xl' fw={500}>
							Czas na wysłanie zadania minął
						</Text>
					</Flex>
				</Overlay>
			)}
			{answerSend && (
				<Overlay backgroundOpacity={0.85} className={classes.overlayContainer}>
					<Flex h='100%' justify='center' align='center' gap='md'>
						<IconCircleCheck size='1.75rem' color='var(--good-state-color)' />
						<Text fz='xl' fw={500} c='var(--good-state-color)'>
							Zadanie zostało przesłane pomyślnie
						</Text>
					</Flex>
				</Overlay>
			)}
			<Flex
				mih={131}
				gap='lg'
				align='center'
				className={classes.taskTabWrapper}
			>
				<ThemeIcon size='lg' miw='10%' ml='md' radius='sm'>
					<Text fw={500}>{taskNumber}</Text>
				</ThemeIcon>
				<Text my='md' w='90%'>
					{isMarkdown
						? spliceQuestion(
								'Treść zdania jest w formacie Markdown, by zobaczyć pełną treść przejdź do podglądu zadania.'
						  )
						: spliceQuestion(taskQuestion)}
				</Text>
				<DateTimeDisplay
					date={closeDate}
					title='Data zakończenia'
					icon={<IconClockHour4 size={20} />}
					w='50%'
					gap={0}
					align='flex-end'
					mr='md'
				/>
			</Flex>
		</Box>
	);
}

export default TaskTab;
