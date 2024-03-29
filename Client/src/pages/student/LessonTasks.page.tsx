import TaskTab from '@/components/TaskTab/Task.tab';
import DataNotFound from '@/components/UI/DataNotFound';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetTasksByLessonId } from '@/hooks/lessons/useGetTasksByLessonId';
import { Center, Flex, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

function LessonTasksPage() {
	const { id } = useParams();

	const { data: TasksList, isPending } = useGetTasksByLessonId(+id!);
	if (isPending) {
		return <FullScreenLoader />;
	}

	if (TasksList?.tasks.length === 0) {
		return <DataNotFound firstLineText='Lista zadań' secondLineText='jest pusta' />;
	}

	return (
		<Center>
			<Stack align='center'>
				<Stack align='center' gap='sm'>
					<Title order={1}>Lekcja&nbsp;{TasksList?.lessonNumber}</Title>
				</Stack>

				<Flex direction='column' gap='md' mr='sm'>
					{TasksList?.tasks.map(task => (
						<TaskTab
							key={`${task.id}-Tab`}
							lessonId={+id!}
							taskId={task.id}
							taskNumber={task.number}
							taskQuestion={task.question}
							closeDate={task.closeDate}
							answerSend={task.answerSend}
							isMarkdown={task.isMarkdown}
						/>
					))}
				</Flex>
			</Stack>
		</Center>
	);
}

export default LessonTasksPage;
