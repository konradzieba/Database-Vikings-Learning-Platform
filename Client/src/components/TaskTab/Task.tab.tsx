import { Box, Flex, Overlay, Text, ThemeIcon } from '@mantine/core';
import { IconClockHour4, IconLock } from '@tabler/icons-react';
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
}

function TaskTab({ lessonId, taskId, taskNumber, taskQuestion, closeDate }: TaskTabProps) {
	const navigate = useNavigate();
	const spliceQuestion = (question: string) => {
		if (question.length > 251) {
			return question.substring(0, 251) + '...';
		} else {
			return question;
		}
	};
	const isTaskExpired = dayjs(dayjs().toDate()).isAfter(closeDate, 'minutes');

	return (
		<Box tabIndex={1} onClick={() => navigate(`/task/${lessonId}/${taskId}`)} pos='relative'>
			{isTaskExpired && (
				<Overlay backgroundOpacity={0.85} style={{ cursor: 'pointer' }}>
					<Flex h='100%' justify='center' align='center' gap='md'>
						<IconLock color='var(--mantine-color-dimmed)' size='1.75rem' />
						<Text c='dimmed' fz='xl' fw={500}>
							Czas na wysłanie zadania minął
						</Text>
					</Flex>
				</Overlay>
			)}
			<Flex mih={100} gap='lg' align='center' className={classes.taskTabWrapper}>
				<ThemeIcon size='lg' miw='10%' ml='md' radius='sm'>
					<Text fw={500}>{taskNumber}</Text>
				</ThemeIcon>
				<Text my='md' miw='40%'>
					{spliceQuestion(taskQuestion)}
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
