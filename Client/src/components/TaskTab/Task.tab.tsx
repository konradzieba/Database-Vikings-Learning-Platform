import { Flex, Text, ThemeIcon } from '@mantine/core';
import { IconClockHour4 } from '@tabler/icons-react';
import classes from './Task.tab.module.css';
import DateTimeDisplay from '../UI/DateTimeDisplay';

const mockData = {
	taskNumber: 12,
	taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
	closeDate: '2023-10-19T19:26:15.000Z',
};

function TaskTab() {
	const spliceQuestion = (question: string) => {
		if (question.length > 251) {
			return question.substring(0, 251) + '...';
		} else {
			return question;
		}
	};
	return (
		<>
			<Flex my='md' />
			<Flex gap='lg' align='center' mx='auto' className={classes.taskTabWrapper}>
				<ThemeIcon size='lg' w='10%' ml='md' radius='sm'>
					<Text fw={500}>{mockData.taskNumber}</Text>
				</ThemeIcon>
				<Text my='md'>{spliceQuestion(mockData.taskQuestion)}</Text>
				<DateTimeDisplay
					date={mockData.closeDate}
					title='Data zakończenia'
					icon={<IconClockHour4 size={20} />}
					w='50%'
					gap={0}
					align='flex-end'
					mr='md'
				/>
			</Flex>
		</>
	);
}

export default TaskTab;
