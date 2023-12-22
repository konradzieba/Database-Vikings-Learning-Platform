import { Button, Divider, Flex, HoverCard, Stack, ThemeIcon, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencilStar } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';

function LecturerSpecialTaskMenu() {
	const handleOpenCreateSpecialTaskModal = () => {
		modals.openContextModal({
			modal: 'createSpecialTask',
			title: 'Tworzenie zadania specjalnego',
			size: 'xl',
			closeOnClickOutside: false,
			innerProps: {
				modalBody: '',
			},
		});
	};

	return (
		<Flex style={{ alignSelf: 'flex-start' }}>
			<HoverCard width={230} shadow='md' withArrow arrowSize={15} zIndex={100}>
				<HoverCard.Target>
					<ThemeIcon variant='transparent' size={rem(26)} c='var(--special-task-color)'>
						<IconPencilStar />
					</ThemeIcon>
				</HoverCard.Target>
				<HoverCard.Dropdown>
					<Stack>
						<Button miw={150} onClick={handleOpenCreateSpecialTaskModal}>
							Dodaj zadanie specjalne
						</Button>
						<Divider />
						<NavLink className={classes.specialTaskButton} to='special-tasks'>
							Oceń zadania specjalne
						</NavLink>
					</Stack>
				</HoverCard.Dropdown>
			</HoverCard>
		</Flex>
	);
}

export default LecturerSpecialTaskMenu;
