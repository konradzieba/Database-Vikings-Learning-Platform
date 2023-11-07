import TaskTab from '@/components/TaskTab/Task.tab';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetTasksByLessonId } from '@/hooks/lessons/useGetTasksByLessonId';
import { Center, Flex, ScrollArea, Stack, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

function LessonTasksPage() {
	const { id } = useParams();

	const { data: TasksList, isPending } = useGetTasksByLessonId(+id!);

	if (isPending) {
		return <FullScreenLoader />;
	}

	if (TasksList?.tasks.length === 0) {
		return (
			<Center>
				<Text>NO TASKS ADDED YET</Text>
			</Center>
		);
	}

	return (
		<Center>
			<Stack align='center'>
				<Stack align='center' gap='sm'>
					<Title order={1}>Lekcja&nbsp;{TasksList?.lessonNumber}</Title>
				</Stack>

				<ScrollArea type='auto' h={450} w='50%' pb='sm' offsetScrollbars='y'>
					<Flex direction='column' gap='md' mr='sm'>
						{TasksList?.tasks.map(task => (
							<TaskTab
								key={`${task.id}-Tab`}
								lessonId={+id!}
								taskId={task.id}
								taskNumber={task.number}
								taskQuestion={task.question}
								closeDate={task.closeDate}
							/>
						))}
					</Flex>
				</ScrollArea>
			</Stack>
		</Center>
	);
}

export default LessonTasksPage;
