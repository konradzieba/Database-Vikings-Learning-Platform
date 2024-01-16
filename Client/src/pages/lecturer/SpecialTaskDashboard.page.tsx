import StudentSpecialTaskAnswerCard from '@/components/StudentSpecialTaskAnswerCard/StudentSpecialTaskAnswer.card';
import DataNotFound from '@/components/UI/DataNotFound';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import SpecialTaskAnswersStats from '@/components/UI/SpecialTaskAnswersStats';
import TaskAnswersStats from '@/components/UI/TaskAnswersStats';
import { useGetSpecialTasksToEvaluateQuery } from '@/hooks/tasks/useGetSpecialTasksToEvaluateQuery';
import { Center, Flex, Tabs, Text, Title, Tooltip, rem } from '@mantine/core';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function SpecialTaskDashboardPage() {
	const [searchParams] = useSearchParams();

	const { data: specialTasksToEvaluate, isPending } = useGetSpecialTasksToEvaluateQuery();

	const isRepliedTabChosen = searchParams.get('status') === 'replied';

	useMemo(() => {
		if (specialTasksToEvaluate?.specialTasksToEvaluate) {
			specialTasksToEvaluate.specialTasksToEvaluate.sort((a, b) => {
				return a.taskInfo.id - b.taskInfo.id;
			});
		}
	}, [specialTasksToEvaluate]);

	if (isPending) {
		return <FullScreenLoader />;
	}

	if (!specialTasksToEvaluate) {
		return <DataNotFound firstLineText='Brak zadań' secondLineText='specjalnych' />;
	}

	const shortenTaskTitleTab = (taskTitle: string) => {
		return taskTitle.substring(0, 20) + '...';
	};

	const tasksTabs = specialTasksToEvaluate.specialTasksToEvaluate.map(task => {
		return (
			<Tooltip
				label={task.taskInfo.title}
				position='left'
				withArrow
				multiline
				w={220}
				arrowSize={5}
				color='var(--primary-bg-color-lighter)'
				c='var(--font-color)'>
				<Tabs.Tab value={`task-${task.taskInfo.id}`} key={`task-${task.taskInfo.id}`}>
					{shortenTaskTitleTab(task.taskInfo.title)}
				</Tabs.Tab>
			</Tooltip>
		);
	});

	const tasksPanels = specialTasksToEvaluate.specialTasksToEvaluate.map(task => {
		return (
			<Tabs.Panel value={`task-${task.taskInfo.id}`} key={`task-${task.taskInfo.id}-panel`}>
				<Flex direction='column'>
					<SpecialTaskAnswersStats specialTaskId={task.taskInfo.id} />
					<Flex wrap='wrap' gap='xl' mx='lg' mt='md' justify='flex-start'>
						{isRepliedTabChosen
							? task.answerInfo.map(answer => {
									if (answer.grantedScore) {
										return (
											<StudentSpecialTaskAnswerCard
												key={`${task.taskInfo.id}-${answer.indexNumber}-answer`}
												studentId={answer.studentId}
												answerId={answer.id}
												firstName={answer.firstName}
												lastName={answer.lastName}
												index={answer.indexNumber}
												answer={answer.solution}
												isScoreGranted={true}
												sendDate={answer.sendDate}
											/>
										);
									}
									return null;
							  })
							: task.answerInfo.map(answer => {
									if (!answer.grantedScore) {
										return (
											<StudentSpecialTaskAnswerCard
												key={`${task.taskInfo.id}-${answer.indexNumber}-answer`}
												studentId={answer.studentId}
												answerId={answer.id}
												firstName={answer.firstName}
												lastName={answer.lastName}
												index={answer.indexNumber}
												isScoreGranted={false}
												answer={answer.solution}
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
				<Tabs
					orientation='vertical'
					defaultValue={`task-${specialTasksToEvaluate.specialTasksToEvaluate[0].taskInfo.id}`}
					h='60vh'
					w='60vw'
					mt='sm'>
					<Tabs.List grow>{tasksTabs}</Tabs.List>
					{tasksPanels}
				</Tabs>
			</Center>
		</>
	);
}

export default SpecialTaskDashboardPage;
