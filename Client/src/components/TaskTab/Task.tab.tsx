import { Box, Button, Flex, Text, ThemeIcon } from '@mantine/core';
import { IconClockHour4 } from '@tabler/icons-react';
import classes from './Task.tab.module.css';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import { useNavigate } from 'react-router-dom';

interface TaskTabProps {
	taskNumber: number;
	taskQuestion: string;
	closeDate: string;
}

function TaskTab({ taskNumber, taskQuestion, closeDate }: TaskTabProps) {
	const navigate = useNavigate();
	const spliceQuestion = (question: string) => {
		if (question.length > 251) {
			return question.substring(0, 251) + '...';
		} else {
			return question;
		}
	};
	return (
		<Box component='a' tabIndex={1} onClick={() => navigate('/task/2')}>
			<Flex gap='lg' align='center' className={classes.taskTabWrapper}>
				<ThemeIcon size='lg' w='10%' ml='md' radius='sm'>
					<Text fw={500}>{taskNumber}</Text>
				</ThemeIcon>
				<Text my='md'>{spliceQuestion(taskQuestion)}</Text>
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
