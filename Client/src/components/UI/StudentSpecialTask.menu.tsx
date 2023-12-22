import {
	Divider,
	Flex,
	Group,
	HoverCard,
	Indicator,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { IconClock, IconStarFilled } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { useGetSpecialTasksQuery } from '@/hooks/tasks/useGetSpecialTasksQuery';

function StudentSpecialTaskMenu() {
	const { studentData } = useStudentStore();
	console.log(studentData);

	const { data: specialTasksData, isSuccess } = useGetSpecialTasksQuery(
		studentData.lecturerId!
	);
	console.log(specialTasksData);
	return (
		<Flex style={{ alignSelf: 'flex-start' }}>
			<HoverCard width={280} shadow='md' withArrow arrowSize={15}>
				<HoverCard.Target>
					{/* disabled or not when special task pops up */}
					<Indicator color='red' size={7}>
						<ThemeIcon
							variant='transparent'
							size={rem(24)}
							c='var(--special-task-color)'
						>
							<IconStarFilled />
						</ThemeIcon>
					</Indicator>
				</HoverCard.Target>
				<HoverCard.Dropdown>
					{/* text or card render depends on is there a special task added */}
					{/* :taskId will be changed depend on specialTaskID */}
					<Flex direction='column' gap='sm'>
						<NavLink to={`special-task/1`} className={classes.specialTaskCard}>
							<Text fw={500}>Zadanie specjalne 1</Text>
							<Group>
								<IconClock />
								<Text>00-00-2000 15:15</Text>
							</Group>
						</NavLink>
						<Text mx='auto' c='dimmed' fs='italic'>
							Brak zadań specjalnych
						</Text>
						<Divider />
						<NavLink
							to='/my-special-tasks'
							className={classes.specialTaskButton}
						>
							Moje zadania specjalne
						</NavLink>
					</Flex>
				</HoverCard.Dropdown>
			</HoverCard>
		</Flex>
	);
}

export default StudentSpecialTaskMenu;
