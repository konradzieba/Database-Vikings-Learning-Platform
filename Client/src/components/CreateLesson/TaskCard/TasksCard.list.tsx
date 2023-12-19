import { Box, Flex, rem } from '@mantine/core';
import TaskCard from './Task.card';
import AddTaskCard from './AddTask.card';
import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

function TasksCardList() {
	const { id } = useParams();

	const { createdLessonsArray } = useCreateLessonStore();

	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +id!);

	return (
		<Box mih={rem(550)} mb='xl'>
			<Flex w='80%' mt={rem(43)} mx='auto' gap='md' direction='column' align='center' justify='center'>
				{lessonFromGroup?.tasks &&
					lessonFromGroup.tasks.map((task, index) => (
						<TaskCard
							key={index}
							number={task.number}
							question={task.question}
							closeDate={task.closeDate}
							isExtra={task.isExtra}
							isMarkdown={task.isMarkdown}
						/>
					))}
				<AddTaskCard />
			</Flex>
		</Box>
	);
}

export default TasksCardList;
