import { Flex, SimpleGrid, rem } from '@mantine/core';
import TaskCard from './Task.card';
import AddTaskCard from './AddTask.card';
import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/store';

function TasksCardList() {
	const { id } = useParams();

	const { createdLessonsArray } = useCreateLessonStore();

	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +id!);

	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={4} spacing='xl'>
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
			</SimpleGrid>
		</Flex>
	);
}

export default TasksCardList;
