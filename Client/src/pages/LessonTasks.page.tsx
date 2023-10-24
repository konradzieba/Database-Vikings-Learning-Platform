import TaskTab from '@/components/TaskTab/Task.tab';
import { Box, Center, ScrollArea, Stack, Title } from '@mantine/core';

const mockData = {
	lessonNumber: 1,
	lessonDescription: 'Poczatki z bazami danych!',
	tasks: [
		{
			taskNumber: 1,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
		{
			taskNumber: 2,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
		{
			taskNumber: 3,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
		{
			taskNumber: 4,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
		{
			taskNumber: 5,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
		{
			taskNumber: 6,
			taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
			closeDate: '2023-10-19T19:26:15.000Z',
		},
	],
};

function LessonTasksPage() {
	return (
		<Center>
			<Stack align='center'>
				<Stack align='center' gap='sm'>
					<Title order={1}>Lekcja&nbsp;{mockData.lessonNumber}</Title>
					<Title order={2}>{mockData.lessonDescription}</Title>
				</Stack>
				<ScrollArea type='auto' h={450} pb='sm' offsetScrollbars='y' w='50%'>
					{mockData.tasks.map(task => (
						<Box  >
							<TaskTab
								key={task.taskNumber}
								taskNumber={task.taskNumber}
								taskQuestion={task.taskQuestion}
								closeDate={task.closeDate}
							/>
						</Box>
					))}
				</ScrollArea>
			</Stack>
		</Center>
	);
}

export default LessonTasksPage;
