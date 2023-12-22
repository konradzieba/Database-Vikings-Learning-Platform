import { Center, Divider, Flex, Group, HoverCard, Indicator, Loader, Text, ThemeIcon, rem } from '@mantine/core';
import { IconClock, IconStarFilled } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { useGetSpecialTasksQuery } from '@/hooks/tasks/useGetSpecialTasksQuery';
import dayjs from 'dayjs';

function StudentSpecialTaskMenu() {
	const { studentData } = useStudentStore();

	const { data: specialTasksData, isLoading } = useGetSpecialTasksQuery(studentData.lecturerId!);

	return (
		<Flex style={{ alignSelf: 'flex-start' }}>
			<HoverCard width={280} shadow='md' withArrow arrowSize={15}>
				<HoverCard.Target>
					<Indicator color='red' size={7} disabled={specialTasksData?.specialTasks.length === 0}>
						<ThemeIcon variant='transparent' size={rem(24)} c='var(--special-task-color)'>
							<IconStarFilled />
						</ThemeIcon>
					</Indicator>
				</HoverCard.Target>
				<HoverCard.Dropdown>
					<Flex direction='column' gap='sm'>
						{isLoading ? (
							<Center>
								<Loader />
							</Center>
						) : specialTasksData?.specialTasks.length === 0 ? (
							<Text mx='auto' c='dimmed' fs='italic'>
								Brak zadań specjalnych
							</Text>
						) : (
							specialTasksData?.specialTasks.map(specialTask => (
								<NavLink key={specialTask.id} to={`special-task/${specialTask.id}`} className={classes.specialTaskCard}>
									<Text fw={500}>Zadanie specjalne {specialTask.number}</Text>
									<Group>
										<IconClock />
										<Text>{dayjs(specialTask.openDate).format('DD/MM/YYYY, HH:mm')}</Text>
									</Group>
								</NavLink>
							))
						)}
						<Divider />
						<NavLink to='/my-special-tasks' className={classes.specialTaskButton}>
							Moje zadania specjalne
						</NavLink>
					</Flex>
				</HoverCard.Dropdown>
			</HoverCard>
		</Flex>
	);
}

export default StudentSpecialTaskMenu;
