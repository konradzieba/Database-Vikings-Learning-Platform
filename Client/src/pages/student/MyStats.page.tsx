import AbsentList from '@/components/StudentPreview/AbsentList';
import StatsCell from '@/components/StudentPreview/StatsCell';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetStudentPreviewDataQuery } from '@/hooks/students/useGetStudentPreviewDataQuery';
import { formatDuration } from '@/utils/formatAverageSendTime';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import {
	Center,
	Divider,
	Flex,
	Group,
	SimpleGrid,
	Space,
	Stack,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core';
import {
	IconChartBar,
	IconChecklist,
	IconUser,
	IconUsers,
	IconUsersGroup,
} from '@tabler/icons-react';
import CountUp from 'react-countup';

function MyStatsPage() {
	const { studentData: studentStoreData } = useStudentStore();
	const { data, isLoading, isError } = useGetStudentPreviewDataQuery(
		studentStoreData.studentId!
	);
	if (isLoading) return <FullScreenLoader />;

	if (isError) {
		return (
			<Center mih='30vh'>
				<Text size='lg' fw={500}>
					Wystąpił błąd podczas pobierania statystyk
				</Text>
			</Center>
		);
	}

	if (!data)
		return (
			<Center mih='30vh'>
				<Title order={1} size={rem(26)}>
					Niestety nie udało się pobrać danych. Spróbuj ponownie
				</Title>
			</Center>
		);

	const { studentInfo, absentLessonNumbers, taskStats } = data.studentData;
	const averageTaskSolveTimeInSeconds =
		(studentInfo.aggregatedSendTime * 1_000_000) / taskStats.sentTasksAmount;
	const averageTaskSolveTime = formatDuration(averageTaskSolveTimeInSeconds);
	return (
		<Stack maw={1200} align='center' mx='auto' mb='xl' px='sm'>
			<Group align='center' gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconUsersGroup stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Twoja przydzielona grupa
				</Title>
			</Group>
			<StatsCell label='' value={studentInfo.Group.name} />
			<Divider w='100%' size='md' my='md' />
			<Group gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconChartBar stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Twoje statystyki zadań
				</Title>
			</Group>
			<StatsCell
				label='Łączna ilość zadań'
				value={taskStats.totalTasksAmount}
			/>
			<SimpleGrid cols={4} w='100%'>
				<StatsCell
					label='Zadania do wykonania'
					value={taskStats.toDoTasksAmount}
				/>
				<StatsCell
					label='Przesłane zadania'
					value={taskStats.sentTasksAmount}
				/>
				<StatsCell
					label='Ocenione zadania'
					value={taskStats.repliedAnswersAmount}
				/>
				<StatsCell
					label='Spóźnione zadania'
					value={taskStats.notRepliedAndOutdatedTasksAmount}
				/>
			</SimpleGrid>
			<Space h={rem(5)} />
			<StatsCell
				label='Średni czas wykonania zadania'
				value={
					studentInfo.aggregatedSendTime === 0 ? 'Brak' : averageTaskSolveTime
				}
				dimmed={studentInfo.aggregatedSendTime === 0}
			/>
			<Divider w='100%' size='md' my='md' />
			<Group align='center' gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconChecklist stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Twoje nieobecności
				</Title>
			</Group>
			<Center>
				<AbsentList absentLessonNumbers={absentLessonNumbers} />
			</Center>
		</Stack>
	);
}

export default MyStatsPage;
