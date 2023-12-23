import { useEffect, useMemo, useState } from 'react';
import { Divider, Flex, Group, HoverCard, Indicator, Text, ThemeIcon, rem } from '@mantine/core';
import { IconClock, IconStarFilled } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar/Navbar.module.css';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { useGetSpecialTasksQuery } from '@/hooks/tasks/useGetSpecialTasksQuery';
import dayjs from 'dayjs';
import socket from '@/utils/sockets/socket-instance';
import SocketEvents from '@/utils/sockets/socket-events';
import { TAssignedSpecialTasks } from '@/types/StoreTypes';
import AmountOfSpecialTaskAnswersLeft from './AmountOfSpecialTaskLeft';

function StudentSpecialTaskMenu() {
	const { studentData } = useStudentStore();
	const [specialTasks, setSpecialTasks] = useState<TAssignedSpecialTasks[]>([]);
	const [specialTaskIdToUpdate, setSpecialTaskIdToUpdate] = useState<number>();

	const { data: specialTasksData } = useGetSpecialTasksQuery(studentData.lecturerId!);

	useEffect(() => {
		if (specialTasksData && Array.isArray(specialTasksData.specialTasks)) {
			setSpecialTasks(specialTasksData.specialTasks);
		}
	}, [specialTasksData]);

	useEffect(() => {
		if (studentData.lecturerId) {
			socket.emit(SocketEvents.CLIENT.JOIN_ROOM, studentData.lecturerId.toString());

			socket.on(SocketEvents.CLIENT.EMIT_SPECIAL_TASK, (data: TAssignedSpecialTasks) => {
				setSpecialTasks(prev => [...prev, { ...data, isFromSocket: true }]);
			});

			socket.on(SocketEvents.CLIENT.REDUCE_AMOUNT_OF_TASKS, ({ specialTaskId }: { specialTaskId: number }) => {
				setSpecialTaskIdToUpdate(specialTaskId);
			});
		}
	}, [socket, studentData.lecturerId]);

	useEffect(() => {
		setSpecialTasks(prev => {
			return prev.map(task => {
				if (task.id === specialTaskIdToUpdate) {
					return {
						...task,
						numberOfAnswers: task.numberOfAnswers === 0 ? 0 : task.numberOfAnswers - 1,
					};
				}
				return task;
			});
		});
		setSpecialTaskIdToUpdate(-1);
	}, [specialTaskIdToUpdate]);

	const specialTasksWithoutDuplicates = useMemo(() => {
		const uniqueTaskIds = new Set<number>();
		return specialTasks.filter(specialTask => {
			if (!uniqueTaskIds.has(specialTask.id)) {
				uniqueTaskIds.add(specialTask.id);
				return true;
			}
			return false;
		});
	}, [specialTasks]);

	return (
		<Flex style={{ alignSelf: 'flex-start' }}>
			<HoverCard width={300} shadow='md' withArrow arrowSize={15}>
				<HoverCard.Target>
					<Indicator color='red' size={7} disabled={specialTasksWithoutDuplicates.length === 0}>
						<ThemeIcon variant='transparent' size={rem(24)} c='var(--special-task-color)'>
							<IconStarFilled />
						</ThemeIcon>
					</Indicator>
				</HoverCard.Target>
				<HoverCard.Dropdown>
					<Flex direction='column' gap='sm'>
						{specialTasksWithoutDuplicates.length === 0 ? (
							<Text mx='auto' c='dimmed' fs='italic'>
								Brak zadań specjalnych
							</Text>
						) : (
							specialTasksWithoutDuplicates.map(specialTask => {
								if (specialTask.numberOfAnswers > 0) {
									return (
										<NavLink
											key={specialTask.id}
											to={`special-task/${specialTask.id}`}
											className={classes.specialTaskCard}>
											<Text fw={500}>{specialTask.title}</Text>
											<Group>
												<IconClock />
												<Text>{dayjs(specialTask.openDate).format('DD/MM/YYYY, HH:mm')}</Text>
											</Group>
											<AmountOfSpecialTaskAnswersLeft answersLeft={specialTask.numberOfAnswers} />
										</NavLink>
									);
								}
							})
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
