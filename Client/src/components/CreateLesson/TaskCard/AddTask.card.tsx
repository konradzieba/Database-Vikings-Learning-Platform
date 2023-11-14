import { Box, Button, Flex, ThemeIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './Task.card.module.css';
import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';

function AddTaskCard() {
	const { id } = useParams();

	const handleOpenAddTaksModal = () => {
		modals.openContextModal({
			modal: 'addTask',
			title: 'Dodaj zadanie',
			size: 'xl',
			closeOnClickOutside: false,
			innerProps: {
				modalBody: '',
				groupId: +id!,
			},
		});
	};

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
