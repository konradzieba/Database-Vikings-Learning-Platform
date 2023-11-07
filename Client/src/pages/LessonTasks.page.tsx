import TaskTab from '@/components/TaskTab/Task.tab';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetTasksByLessonId } from '@/hooks/lessons/useGetTasksByLessonId';
import { Box, Center, ScrollArea, Stack, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

function LessonTasksPage() {
	const { id } = useParams();

	const { data: TasksList, isPending } = useGetTasksByLessonId(+id!);

	return (
		<>
			{isPending ? (
				<FullScreenLoader />
			) : TasksList?.tasks.length === 0 ? (
				<Center>
					<Text>NO TASKS ADDED YET</Text>
				</Center>
			) : (
				<Center>
					<Stack align='center'>
						<Stack align='center' gap='sm'>
							<Title order={1}>Lekcja&nbsp;{TasksList?.lessonNumber}</Title>
						</Stack>
						<ScrollArea type='auto' h={450} pb='sm' offsetScrollbars='y'>
							{TasksList?.tasks.map(task => (
								<Box>
									<TaskTab
										key={`${task.id}-${task.closeDate}`}
										lessonId={+id!}
										taskId={task.id}
										taskNumber={task.number}
										taskQuestion={task.question}
										closeDate={task.closeDate}
									/>
								</Box>
							))}
						</ScrollArea>
					</Stack>
				</Center>
			)}
		</>
	);
}

export default LessonTasksPage;
