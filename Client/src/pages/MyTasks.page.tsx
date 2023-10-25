import StudentTaskAccordion from '@/components/StudentTaskAccordion/StudentTask.accordion';
import { Center, Flex, ScrollArea, Tabs, Text, Title } from '@mantine/core';

const mockDataPendingAnswers = [
	{
		lessonNumber: 1,
		tasks: [
			{
				taskNumber: 1,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PENDING',
				replyDesc: null,
				solution: 'SELECT * FROM DB; 123',
				grantedScore: null,
			},
			{
				taskNumber: 2,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PENDING',
				replyDesc: null,
				solution: 'SELECT * FROM DB; 123',
				grantedScore: null,
			},
		],
	},
	{
		lessonNumber: 3,
		tasks: [
			{
				taskNumber: 1,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PENDING',
				replyDesc: null,
				solution: 'SELECT * FROM DB; 123',
				grantedScore: null,
			},
			{
				taskNumber: 2,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PENDING',
				replyDesc: null,
				solution: 'SELECT * FROM DB; 123',
				grantedScore: null,
			},
			{
				taskNumber: 3,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PENDING',
				replyDesc: null,
				solution: 'SELECT * FROM DB; 123',
				grantedScore: null,
			},
		],
	},
];

const mockDataRestAnswers = [
	{
		lessonNumber: 1,
		tasks: [
			{
				taskNumber: 2,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'CORRECT',
				replyDesc: 'Fajnie wykonane zdanie',
				solution: 'SELECT * FROM DB; 123',
				grantedScore: 100,
			},
			{
				taskNumber: 3,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'INCORRECT',
				replyDesc: 'Błąd w poleceniu SQL',
				solution: 'SELECT * FROM DB; 123',
				grantedScore: 11,
			},
		],
	},
	{
		lessonNumber: 2,
		tasks: [
			{
				taskNumber: 1,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'CORRECT',
				replyDesc: 'Piękna optymalizacja kodu',
				solution: 'SELECT * FROM DB; 123',
				grantedScore: 80,
			},
			{
				taskNumber: 2,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'PARTLY_CORRECT',
				replyDesc: 'Popatrz na to z jakiej tabeli wyciągasz wartości',
				solution: 'SELECT * FROM DB; 123',
				grantedScore: 100,
			},
			{
				taskNumber: 3,
				taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
				replyStatus: 'INCORRECT',
				replyDesc: 'Nie ma takiego zapytania.',
				solution: 'SELECT * FROM DB; 123',
				grantedScore: 95,
			},
		],
	},
];

function SendStudentAnswers() {
	return (
		<>
			{mockDataPendingAnswers.map((answer, index) => (
				<Flex direction='column' align='center' key={`${answer.lessonNumber}-${index}`} mb='xl'>
					<Title order={2} mb='xs'>
						Lekcja&nbsp;{answer.lessonNumber}
					</Title>
					<StudentTaskAccordion tasks={answer.tasks} />
				</Flex>
			))}
		</>
	);
}

function RestStudentAnswers() {
	return (
		<>
			{mockDataRestAnswers.map((answer, index) => (
				<Flex direction='column' align='center' key={`${answer.lessonNumber}-${index}`} mb='xl'>
					<Title order={2} mb='xs'>
						Lekcja&nbsp;{answer.lessonNumber}
					</Title>
					<StudentTaskAccordion tasks={answer.tasks} />
				</Flex>
			))}
		</>
	);
}

function MyTasksPage() {
	return (
		<Center>
			<Tabs defaultValue='send' w='50%'>
				<Tabs.List mb='sm' justify='center'>
					<Tabs.Tab value='send'>
						<Text>Przesłane</Text>
					</Tabs.Tab>
					<Tabs.Tab value='revised'>
						<Text>Zwrócone</Text>
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='send'>
					<ScrollArea type='auto' h={470} pb='sm' offsetScrollbars='y'>
						<SendStudentAnswers />
					</ScrollArea>
				</Tabs.Panel>

				<Tabs.Panel value='revised'>
					<ScrollArea type='auto' h={470} pb='sm' offsetScrollbars='y'>
						<RestStudentAnswers />
					</ScrollArea>
				</Tabs.Panel>
			</Tabs>
		</Center>
	);
}

export default MyTasksPage;
