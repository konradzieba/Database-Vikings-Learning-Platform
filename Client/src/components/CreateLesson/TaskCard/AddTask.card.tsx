import { Dispatch, SetStateAction } from 'react';
import { Box, Button, Flex, ThemeIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './Task.card.module.css';
import { modals } from '@mantine/modals';
import { TaskProps } from '@/pages/lecturer/CreateLesson.page';

interface AddTaskCardProps {
	tasks: TaskProps[];
	setTasks: Dispatch<SetStateAction<TaskProps[]>>;
}

function AddTaskCard({ tasks, setTasks }: AddTaskCardProps) {
	const handleOpenAddTaksModal = () => {
		modals.openContextModal({
			modal: 'addTask',
			title: 'Dodaj zadanie',
			size: 'xl',
			closeOnClickOutside: false,
			innerProps: {
				modalBody: '',
				setTasks: setTasks,
				tasksLength: tasks.length,
			},
		});
	};

	// const handleTest = () => {
	// 	setTasks(prevState => [
	// 		...prevState,
	// 		{
	// 			number: 1,
	// 			question: 'kotek?',
	// 			closeDate: '01-05-2000',
	// 			isMarkDown: false,
	// 			isExtra: false,
	// 			lessonId: 12,
	// 		},
	// 	]);
	// };

	return (
		<Box className={classes.addTaskCardContainer}>
			<Flex justify='center' align='center' h='100%'>
				<Button onClick={handleOpenAddTaksModal} variant='transparent'>
					<ThemeIcon variant='light'>
						<IconPlus />
					</ThemeIcon>
				</Button>
			</Flex>
		</Box>
	);
}

export default AddTaskCard;
