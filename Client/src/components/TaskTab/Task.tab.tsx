import { Flex, Group, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import { IconSun, IconClockHour4 } from '@tabler/icons-react';
import dayjs from 'dayjs';

const mockData = {
	taskNumber: 1,
	taskQuestion:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.',
	closeDate: '2023-10-09T19:26:15.000Z',
};

function TaskTab() {
	const formattedDate = dayjs(mockData.closeDate).format('D/MM/YYYY, HH:mm');
	return (
		<>
			<Flex my='md' />
			<Flex
				gap='lg'
				w='60%'
				align='center'
				mx='auto'
				bg='#292929'
				// dodac border radius
			>
				<ThemeIcon size='lg' w='10%'>
					<IconSun size={20} />
				</ThemeIcon>
				<Text>{mockData.taskQuestion}</Text>
				<Stack w='50%' gap={0}>
					<Text fw={500} size='md'>
						Data zakończenia:
					</Text>
					<Group gap={rem(5)} align='center'>
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
