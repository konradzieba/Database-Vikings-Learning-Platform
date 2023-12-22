import StudentSpecialTaskAnswerCard from '@/components/StudentSpecialTaskAnswerCard/StudentSpecialTaskAnswer.card';
import DataNotFound from '@/components/UI/DataNotFound';
import SpecialTaskAnswersStats from '@/components/UI/SpecialTaskAnswersStats';
import TaskAnswersStats from '@/components/UI/TaskAnswersStats';
import { Center, Flex, Loader, Tabs, Text, Title, rem } from '@mantine/core';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const mock = [
	{
		taskNumber: 1,
		answers: [
			{
				studentId: 1,
				answerId: 1,
				firstName: 'ABC',
				lastName: 'DEF',
				index: 123123,
				answer: 'Siema 123',
				grantedScore: 100,
				sendDate: '2023-12-17T20:38:13.755Z',
			},
			{
				studentId: 2,
				answerId: 2,
				firstName: 'GHJ',
				lastName: 'DEF',
				index: 444444,
				grantedScore: 10,
				answer: 'Siema 123',
				sendDate: '2023-12-17T20:38:13.755Z',
			},
			{
				studentId: 3,
				answerId: 3,
				firstName: 'XYZ',
				lastName: 'DEF',
				index: 333333,
				grantedScore: null,
				answer: 'Siema 123',
				sendDate: '2023-12-17T20:38:13.755Z',
			},
		],
	},
	{
		taskNumber: 2,
		answers: [],
	},
	{
		taskNumber: 3,
		answers: [],
	},
];

function SpecialTaskDashboardPage() {
	const [searchParams] = useSearchParams();

	const isRepliedTabChosen = searchParams.get('status') === 'replied';

	// Sorting SpecialTask Data
	// useMemo(() -> {
	// })

	// Loader when data is fetching
	// if (isPending) {
	// 	return (
	// 		<Center h='25vh'>
	// 			<Loader />
	// 		</Center>
	// 	);
	// }

	// If there is not special tasks
	// if (!data) {
	// 	return <DataNotFound firstLineText='Brak zadań' secondLineText='specjalnych' />;
	// }

	const tasksTabs = mock.map(task => {
		return (
			<Tabs.Tab
				value={`task-${task.taskNumber}`}
				key={`task-${task.taskNumber}`}>{`Zadanie ${task.taskNumber}`}</Tabs.Tab>
		);
	});

	const tasksPanels = mock.map(task => {
		return (
			<Tabs.Panel value={`task-${task.taskNumber}`} key={`task-${task.taskNumber}-panel`}>
				<Flex direction='column'>
					<SpecialTaskAnswersStats />
					<Flex wrap='wrap' gap='xl' mx='lg' mt='md' justify='flex-start'>
						{isRepliedTabChosen
							? task.answers.map(answer => {
									if (answer.grantedScore) {
										return (
											<StudentSpecialTaskAnswerCard
												key={`${task.taskNumber}-${answer.index}-answer`}
												index={answer.index}
												answer={answer.answer}
												answerId={answer.answerId}
												firstName={answer.firstName}
												lastName={answer.lastName}
												sendDate={answer.sendDate}
											/>
										);
									}
									return null;
							  })
							: task.answers.map(answer => {
									if (!answer.grantedScore) {
										return (
											<StudentSpecialTaskAnswerCard
												key={`${task.taskNumber}-${answer.index}-answer`}
												index={answer.index}
												answer={answer.answer}
												answerId={answer.answerId}
												firstName={answer.firstName}
												lastName={answer.lastName}
												sendDate={answer.sendDate}
											/>
										);
									}
									return null;
							  })}
					</Flex>
				</Flex>
			</Tabs.Panel>
		);
	});

	return (
		<>
			<Center mb='sm' mt={rem(-60)}>
				<Title>Zadania specjalne</Title>
			</Center>
			<Center>
				<Tabs orientation='vertical' defaultValue='task-1' h='60vh' w='60vw' mt='sm'>
					<Tabs.List grow>{tasksTabs}</Tabs.List>
					{tasksPanels}
				</Tabs>
			</Center>
		</>
	);
}

export default SpecialTaskDashboardPage;
