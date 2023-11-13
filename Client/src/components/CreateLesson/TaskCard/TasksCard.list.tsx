import { Dispatch, SetStateAction } from 'react';
import { Flex, SimpleGrid, rem } from '@mantine/core';
import TaskCard from './Task.tab';
import AddTaskCard from './AddTask.card';
import { TaskProps } from '@/pages/lecturer/CreateLesson.page';

interface TasksCardListProps {
	tasks: TaskProps[];
	setTasks: Dispatch<SetStateAction<TaskProps[]>>;
}

function TasksCardList({ tasks, setTasks }: TasksCardListProps) {
	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={4} spacing='xl'>
				{tasks.map((task, index) => (
					<TaskCard key={index} taskNumber={task.number} />
				))}
				<AddTaskCard setTasks={setTasks} tasks={tasks} />
			</SimpleGrid>
		</Flex>
	);
}

export default TasksCardList;
