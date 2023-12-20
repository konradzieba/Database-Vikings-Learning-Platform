import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetStudentPreviewDataQuery } from '@/hooks/students/useGetStudentPreviewDataQuery';
import {
	Box,
	Center,
	Divider,
	Group,
	List,
	ListItem,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core';
import { IconChartBar, IconChecklist, IconUser } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

interface CellProps {
	label: string;
	value: string | number;
	valueWithLts?: boolean;
}

const Cell = ({ label, value, valueWithLts }: CellProps) => {
	return (
		<Box ta='center'>
			<Text>{label}:</Text>
			<Text size='xl' fw={500} lts={valueWithLts ? rem(0.9) : ''}>
				{value}
			</Text>
		</Box>
	);
};

function StudentPreview() {
	const { studentId } = useParams();
	const { data, isLoading, isError } = useGetStudentPreviewDataQuery(
		+studentId!
	);

	if (isLoading) return <FullScreenLoader />;

	if (isError) {
		return (
			<Center mih='30vh'>
				<Text size='lg' fw={500} c='red'>
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

	const { studentInfo } = data.studentData;
	const { absentLessonNumbers } = data.studentData;

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
				<Cell label='Imię' value={studentInfo.User.firstName} />
				<Cell label='Nazwisko' value={studentInfo.User.lastName} />
				<Cell label='Numer indeksu' value={studentInfo.indexNumber} />
				<Cell label='Grupa' value={studentInfo.Group.name} />
				<Cell label='Wynik' value={studentInfo.score} />
				<Cell label='Życia' value={`${studentInfo.health}/3`} valueWithLts />
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
			<Cell
				label='Łączna ilość zadań'
				value={data.studentData.taskStats.totalTasksAmount}
			/>
			<SimpleGrid cols={4} w='100%'>
				<Cell
					label='Zadania do wykonania'
					value={data.studentData.taskStats.toDoTasksAmount}
				/>
				<Cell
					label='Przesłane zadania'
					value={data.studentData.taskStats.sentTasksAmount}
				/>
				<Cell
					label='Ocenione zadania'
					value={data.studentData.taskStats.repliedAnswersAmount}
				/>
				<Cell
					label='Spóźnione zadania'
					value={data.studentData.taskStats.notRepliedAndOutdatedTasksAmount}
				/>
			</SimpleGrid>
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
				<List type='ordered' fz='lg'>
					{absentLessonNumbers.length === 0 ? (
						<Text size='lg' c='dimmed' fs='italic'>
							Brak
						</Text>
					) : (
						absentLessonNumbers.map((lessonNumber) => (
							<ListItem key={lessonNumber} my={rem(5)}>
								<Text size='lg'>
									Lekcja nr&nbsp;
									<Text span fw={500}>
										{lessonNumber}
									</Text>
								</Text>
							</ListItem>
						))
					)}
				</List>
			</Center>
		</Stack>
	);
}

export default StudentPreview;
