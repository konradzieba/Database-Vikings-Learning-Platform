import { Flex, Group, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import { IconClockHour4 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import classes from './Task.tab.module.css';

const mockData = {
	taskNumber: 12,
	taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
	closeDate: '2023-10-19T19:26:15.000Z',
};

function TaskTab() {
	const formattedDate = dayjs(mockData.closeDate).format('D/MM/YYYY, HH:mm');
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
				<Stack w='50%' gap={0} align='flex-end' mr='md'>
					<Text fw={500} size='md'>
						Data zakończenia
					</Text>
					<Group gap={rem(5)}>
						<ThemeIcon variant='transparent'>
							<IconClockHour4 size={20} />
						</ThemeIcon>
						<Text>{formattedDate}</Text>
					</Group>
				</Stack>
			</Flex>
		</>
	);
}

export default TaskTab;
