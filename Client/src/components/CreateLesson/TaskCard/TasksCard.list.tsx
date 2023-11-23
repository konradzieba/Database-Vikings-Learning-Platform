import { Box, Flex, SimpleGrid, rem } from '@mantine/core';
import TaskCard from './Task.card';
import AddTaskCard from './AddTask.card';
import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

function TasksCardList() {
	const { id } = useParams();

	const { createdLessonsArray } = useCreateLessonStore();

	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +id!);

	return (
		<Box h={rem(550)}>
			<Flex w='80%' mt={rem(43)} mx='auto' gap='md' align='center' justify='center' wrap='wrap'>
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
