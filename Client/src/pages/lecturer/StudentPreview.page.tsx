import FullScreenLoader from '@/components/UI/FullScreenLoader';
import StatsCell from '@/components/StudentPreview/StatsCell';
import { useGetStudentPreviewDataQuery } from '@/hooks/students/useGetStudentPreviewDataQuery';
import { Center, Divider, Group, SimpleGrid, Space, Stack, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { IconChartBar, IconChecklist, IconUser } from '@tabler/icons-react';
import AbsentList from '@/components/StudentPreview/AbsentList';
import { formatDuration } from '@/utils/formatAverageSendTime';

function StudentPreview() {
	const { studentId } = useParams();
	const { data, isLoading, isError } = useGetStudentPreviewDataQuery(+studentId!);

	if (isLoading) return <FullScreenLoader />;

	if (isError) {
		return (
			<Center mih='30vh'>
				<Text size='lg' fw={500}>
					Wystąpił błąd podczas pobierania danych studenta
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
	const averageTaskSolveTimeInSeconds = (studentInfo.aggregatedSendTime * 1_000_000) / taskStats.sentTasksAmount;
	const averageTaskSolveTime = formatDuration(averageTaskSolveTimeInSeconds);

	return (
		<Stack maw={1200} align='center' mx='auto' mb='xl' px='sm'>
			<Group align='center' gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconUser stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Dane studenta
				</Title>
			</Group>
			<SimpleGrid cols={3} w='100%'>
				<StatsCell label='Imię' value={studentInfo.User.firstName} />
				<StatsCell label='Nazwisko' value={studentInfo.User.lastName} />
				<StatsCell label='Numer indeksu' value={studentInfo.indexNumber} />
				<StatsCell
					label='Grupa'
					value={studentInfo.Group.name}
					href={`/dashboard/group/${studentInfo.groupId}/students`}
				/>
				<StatsCell label='Wynik' value={studentInfo.score} />
				<StatsCell label='Życia' value={`${studentInfo.health}/3`} valueWithLts />
			</SimpleGrid>
			<Divider w='100%' size='md' my='md' />
			<Group gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconChartBar stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Statystyki zadań
				</Title>
			</Group>
			<StatsCell label='Łączna ilość zadań' value={taskStats.totalTasksAmount} />
			<SimpleGrid cols={4} w='100%'>
				<StatsCell label='Zadania do wykonania' value={taskStats.toDoTasksAmount} />
				<StatsCell label='Przesłane zadania' value={taskStats.sentTasksAmount} />
				<StatsCell label='Ocenione zadania' value={taskStats.repliedAnswersAmount} />
				<StatsCell label='Spóźnione zadania' value={taskStats.notRepliedAndOutdatedTasksAmount} />
			</SimpleGrid>
			<Space h={rem(5)} />
			<StatsCell
				label='Średni czas wykonania zadania'
				value={studentInfo.aggregatedSendTime === 0 ? 'Brak' : averageTaskSolveTime}
				dimmed={studentInfo.aggregatedSendTime === 0}
			/>
			<Divider w='100%' size='md' my='md' />
			<Group align='center' gap='xs'>
				<ThemeIcon variant='transparent' size={rem(26)}>
					<IconChecklist stroke={rem(2.5)} />
				</ThemeIcon>
				<Title mx='auto' order={1} size={rem(26)}>
					Nieobecności studenta
				</Title>
			</Group>
			<Center>
				<AbsentList absentLessonNumbers={absentLessonNumbers} />
			</Center>
		</Stack>
	);
}

export default StudentPreview;
