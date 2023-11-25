import StudentAnswerCard from '@/components/StudentAnswerCard/StudentAnswer.card';
import DataNotFound from '@/components/UI/DataNotFound';
import TaskAnswersStats from '@/components/UI/TaskAnswersStats';
import { useGetLessonInfoByGroupAndLessonIdQueryFn } from '@/hooks/lessons/useGetLessonInfoByGroupAndLessonIdQueryFn';
import { Button, Center, Flex, Loader, Tabs, Title, rem } from '@mantine/core';

import { modals } from '@mantine/modals';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function LessonDashboardPage() {
	const { id, lessonId } = useParams();
	const [searchParams] = useSearchParams();
	const isRepliedTabChosen = searchParams.get('status') === 'replied';
	const {
		data: lessonData,
		isPending,
		refetch: refetchLessonInfo,
	} = useGetLessonInfoByGroupAndLessonIdQueryFn(+id!, +lessonId!);

	useMemo(() => {
		if (lessonData?.lessonInfo.tasks) {
			lessonData.lessonInfo.tasks.sort((a, b) => {
				return a.taskNumber - b.taskNumber;
			});
		}
	}, [lessonData]);

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	if (!lessonData?.lessonInfo.tasks.length) {
		return <DataNotFound firstLineText='Lista zadań' secondLineText='jest pusta' />;
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

	const tasksTabs = lessonData?.lessonInfo.tasks.map(task => {
		return (
			<Tabs.Tab
				value={`task-${task.taskNumber}`}
				key={`task-${task.taskNumber}-tab`}>{`Zadanie ${task.taskNumber}`}</Tabs.Tab>
		);
	});

	const tasksPanels = lessonData?.lessonInfo.tasks.map(task => {
		return (
			<Tabs.Panel value={`task-${task.taskNumber}`} key={`task-${task.taskNumber}-panel`}>
				<Flex direction='column'>
					<TaskAnswersStats
						endDate={task.endDate}
						answers={task.answers}
						notAnsweredList={task.studentsWithoutAnswer}
						taskId={task.taskId}
					/>
					<Flex wrap='wrap' gap='xl' mx='lg' mt='md' justify='flex-start'>
						{isRepliedTabChosen
							? task.answers.map(answer => {
									if (answer.grantedScore) {
										return (
											<StudentAnswerCard
												key={`${task.taskNumber}-${answer.index}-answer`}
												studentId={answer.studentId}
												answerId={answer.answerId}
												firstName={answer.firstName}
												lastName={answer.lastName}
												index={answer.index}
												answer={answer.answer}
												sendDate={answer.sendDate}
												refetchLessonInfo={refetchLessonInfo}
											/>
										);
									}
									return null;
							  })
							: task.answers.map(answer => {
									if (!answer.grantedScore) {
										return (
											<StudentAnswerCard
												key={`${task.taskNumber}-${answer.index}-answer`}
												studentId={answer.studentId}
												answerId={answer.answerId}
												firstName={answer.firstName}
												lastName={answer.lastName}
												index={answer.index}
												answer={answer.answer}
												sendDate={answer.sendDate}
												refetchLessonInfo={refetchLessonInfo}
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
				<Title>Lekcja&nbsp;{lessonData?.lessonInfo.lessonNumber}</Title>
			</Center>
			<Center>
				<Button variant='outline' size='xs' onClick={handleOpenAddTaksModal}>
					Dodaj zadanie
				</Button>
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

export default LessonDashboardPage;
