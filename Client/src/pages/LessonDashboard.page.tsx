import StudentAnswerCard from '@/components/StudentAnswerCard/StudentAnswer.card';
import TaskAnswersStats from '@/components/UI/TaskAnswersStats';
import { useGetLessonInfoByGroupAndLessonIdQueryFn } from '@/hooks/lessons/useGetLessonInfoByGroupAndLessonIdQueryFn';
import {
	Button,
	Center,
	Flex,
	Loader,
	Paper,
	ScrollArea,
	Tabs,
	Text,
	Title,
	rem,
} from '@mantine/core';

import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';

/*
const mockData = {
	lessonNumber: 4,
	tasks: [
		{
			taskNumber: 1,
			endDate: '2023-10-20T19:26:15.000Z',
			studentsWithoutAnswer: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					indexNumber: 123411,
				},
				{
					firstName: 'Johny',
					lastName: 'Johnowski',
					indexNumber: 123412,
				},
			],
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 111111,
					answer: `SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;
SELECT * FROM db; SELECT * FROM db; SELECT * FROM db;`,
					sendDate: '2023-10-21T20:00:00.000Z',
				},
				{
					firstName: 'Jan',
					lastName: 'Janowski',
					index: 222222,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Marcin',
					lastName: 'Marcinowski',
					index: 333333,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Tomek',
					lastName: 'Tomaszewski',
					index: 444444,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Mariola',
					lastName: 'Nowak',
					index: 555555,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Hubert',
					lastName: 'Miły',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Monika',
					lastName: 'Kowalska',
					index: 777777,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Arkadiusz',
					lastName: 'Romanowski',
					index: 888888,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
				{
					firstName: 'Marcin',
					lastName: 'Jankowski',
					index: 999999,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-21T13:00:00.000Z',
				},
			],
		},
		{
			taskNumber: 2,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 3,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 4,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 5,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 6,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 7,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 8,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
		{
			taskNumber: 9,
			endDate: '2023-10-19T19:26:15.000Z',
			answers: [
				{
					firstName: 'Roman',
					lastName: 'Romanowski',
					index: 666666,
					answer: 'SELECT * FROM db;',
					sendDate: '2023-10-19T19:26:15.000Z',
				},
			],
		},
	],
};
*/

function LessonDashboardPage() {
	const { id, lessonId } = useParams();
	const { data: lessonData, isPending } =
		useGetLessonInfoByGroupAndLessonIdQueryFn(+id!, +lessonId!);

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	if (!lessonData?.lessonInfo.tasks.length) {
		return (
			<Center h='25vh'>
				<Paper withBorder p='lg'>
					<Text size='lg'>
						TEMPORARY TEXT WHEN THERE IS NO ELEMENT IN ARRAY
					</Text>
				</Paper>
			</Center>
		);
	}

	const handleOpenAddTaksModal = () => {
		modals.openContextModal({
			modal: 'addTask',
			title: 'Dodaj zadanie',
			size: 'xl',
			closeOnClickOutside: false,
			innerProps: {
				modalBody: '',
			},
		});
	};

	const tasksTabs = lessonData?.lessonInfo.tasks.map((task) => {
		return (
			<Tabs.Tab
				value={`task-${task.taskNumber}`}
				key={`task-${task.taskNumber}-tab`}
			>{`Zadanie ${task.taskNumber}`}</Tabs.Tab>
		);
	});

	const tasksPanels = lessonData?.lessonInfo.tasks.map((task) => {
		return (
			<Tabs.Panel
				value={`task-${task.taskNumber}`}
				key={`task-${task.taskNumber}-panel`}
			>
				<Flex direction='column'>
					<TaskAnswersStats endDate={task.endDate} answers={task.answers} />
					<ScrollArea h={500} type='auto'>
						<Flex wrap='wrap' gap='xl' mx='lg' mt='md' justify='flex-start'>
							{task.answers.map((answer) => {
								return (
									<StudentAnswerCard
										firstName={answer.firstName}
										lastName={answer.lastName}
										index={answer.index}
										answer={answer.answer}
										sendDate={answer.sendDate}
										key={`${task.taskNumber}-${answer.index}-answer`}
									/>
								);
							})}
						</Flex>
					</ScrollArea>
				</Flex>
			</Tabs.Panel>
		);
	});

	return (
		<>
			<Center mb='sm' mt={rem(-60)}>
				<Title>Lekcja&nbsp;{lessonData?.lessonInfo.lessonNumber}</Title>
			</Center>
			<Center>
				<Button variant='outline' size='xs' onClick={handleOpenAddTaksModal}>
					Dodaj zadanie
				</Button>
			</Center>
			<Center>
				<Tabs
					orientation='vertical'
					defaultValue='task-1'
					h='60vh'
					w='60vw'
					mt='sm'
				>
					<Tabs.List grow>{tasksTabs}</Tabs.List>
					{tasksPanels}
				</Tabs>
			</Center>
		</>
	);
}

export default LessonDashboardPage;
