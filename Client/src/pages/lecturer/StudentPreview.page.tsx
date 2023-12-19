import {
	Box,
	Center,
	Divider,
	Group,
	List,
	ListItem,
	SimpleGrid,
	Space,
	Stack,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core';
import { IconChartBar, IconChecklist, IconUser } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const mockData = {
	message: 'success',
	studentData: {
		studentInfo: {
			id: 2,
			indexNumber: 111111,
			score: 1259,
			health: 2,
			groupId: 3,
			aggregatedSendTime: 0.013347,
			lastLogin: '2023-12-19T21:50:09.108Z',
			Group: {
				name: 'Testowa ISI 10',
			},
			User: {
				firstName: 'Tadeusz',
				lastName: 'Prusak',
			},
		},
		absentLessonNumbers: [3, 4, 5],
		taskStats: {
			totalTasksAmount: 5,
			repliedAnswersAmount: 1,
			sentTasksAmount: 2,
			notRepliedAndOutdatedTasksAmount: 3,
			toDoTasksAmount: 0,
		},
	},
};

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

	const { studentInfo } = mockData.studentData;
	const { absentLessonNumbers } = mockData.studentData;

	useMemo(() => {
		absentLessonNumbers.sort((a, b) => a - b);
	}, [absentLessonNumbers]);

	return (
		<Stack maw={1200} align='center' mx='auto' mb='xl'>
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
				value={mockData.studentData.taskStats.totalTasksAmount}
			/>
			<SimpleGrid cols={4} w='100%'>
				<Cell
					label='Zadania do wykonania'
					value={mockData.studentData.taskStats.toDoTasksAmount}
				/>
				<Cell
					label='Ilość przesłanych zadań'
					value={mockData.studentData.taskStats.sentTasksAmount}
				/>
				<Cell
					label='Ilość ocenionych zadań'
					value={mockData.studentData.taskStats.repliedAnswersAmount}
				/>
				<Cell
					label='Ilość spóźnionych zadań'
					value={
						mockData.studentData.taskStats.notRepliedAndOutdatedTasksAmount
					}
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
