import { Flex, SimpleGrid, rem } from '@mantine/core';
import TaskCard from './Task.tab';
import AddTaskCard from './AddTask.card';

interface TasksCardListProps {
	tasksNumbers: number[];
}

function TasksCardList({ tasksNumbers }: TasksCardListProps) {
	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={4} spacing='xl'>
				{tasksNumbers.map(taskNumber => (
					<TaskCard key={taskNumber} taskNumber={taskNumber} />
				))}
				<AddTaskCard />
			</SimpleGrid>
		</Flex>
	);
}

export default TasksCardList;
