import StudentTaskAccordion from '@/components/StudentTaskAccordion/StudentTask.accordion';
import useGetStudentTasksQuery from '@/hooks/tasks/useGetStudentTasks';
import { useStudentStore } from '@/utils/store';
import {
	Center,
	Flex,
	Loader,
	ScrollArea,
	Tabs,
	Text,
	Title,
} from '@mantine/core';
import { IconArrowBackUpDouble, IconSend } from '@tabler/icons-react';
import { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface AnswersProps {
	isPending: boolean;
	tasks:
		| {
				lessonNumber: number;
				tasks: {
					taskNumber: number;
					taskQuestion: string;
					replyStatus: 'PENDING' | 'PARTLY_CORRECT' | 'INCORRECT' | 'CORRECT';
					replyDesc: string;
					solution: string;
					grantedScore: number;
				}[];
		  }[]
		| undefined;
}

const MemoizedStudentAnswers = memo(function StudentAnswers({
	tasks,
	isPending,
}: AnswersProps) {
	if (isPending)
		return (
			<Center h={300}>
				<Loader />
			</Center>
		);
	return (
		<>
			{tasks?.map(
				(answer, index) =>
					answer.tasks.length !== 0 && (
						<Flex
							key={`${answer.lessonNumber}-${index}`}
							direction='column'
							align='center'
							px='sm'
							mb='xl'
						>
							<Title order={2} mb='xs'>
								Lekcja&nbsp;{answer.lessonNumber}
							</Title>
							<StudentTaskAccordion tasks={answer.tasks} />
						</Flex>
					)
			)}
		</>
	);
});

function MyTasksPage() {
	const { studentData } = useStudentStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const isReplied = searchParams.get('status') === 'replied';

	const studentGroupId = studentData.groupId;

	const { data: studentTasks, isPending } = useGetStudentTasksQuery(
		+studentGroupId!
	);

	useMemo(() => {
		if (studentTasks?.tasks) {
			studentTasks.tasks.sort((a, b) => {
				return a.lessonNumber === b.lessonNumber
					? a.tasks[0].taskNumber - b.tasks[0].taskNumber
					: a.lessonNumber - b.lessonNumber;
			});

			studentTasks.tasks.forEach((lesson) => {
				lesson.tasks.sort((a, b) => a.taskNumber - b.taskNumber);
			});
		}
	}, [studentTasks]);

	const pendingStudentAnswers = useMemo(() => {
		return studentTasks?.tasks.map((lesson) => ({
			lessonNumber: lesson.lessonNumber,
			tasks: lesson.tasks.filter((task) => task.replyStatus === 'PENDING'),
		}));
	}, [studentTasks]);

	const repliedStudentAnswers = useMemo(() => {
		return studentTasks?.tasks.map((lesson) => ({
			lessonNumber: lesson.lessonNumber,
			tasks: lesson.tasks.filter((task) => task.replyStatus !== 'PENDING'),
		}));
	}, [studentTasks]);

	return (
		<Center>
			<Tabs defaultValue={isReplied ? 'replied' : 'send'} w='50%'>
				<Tabs.List mb='lg' justify='center'>
					<Tabs.Tab
						w='50%'
						value='send'
						c={isReplied ? undefined : 'var(--mantine-primary-color)'}
						leftSection={<IconSend size='1.5rem' />}
						onClick={() => setSearchParams(undefined)}
					>
						<Text c='var(--font-color)' fw={500} fz='md'>
							Przesłane
						</Text>
					</Tabs.Tab>
					<Tabs.Tab
						w='50%'
						value='replied'
						c={!isReplied ? undefined : 'var(--mantine-primary-color)'}
						leftSection={<IconArrowBackUpDouble size='1.5rem' />}
						onClick={() => setSearchParams({ status: 'replied' })}
					>
						<Text c='var(--font-color)' fw={500} fz='md'>
							Zwrócone
						</Text>
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='send'>
					<ScrollArea type='auto' h={600} pb='sm' offsetScrollbars='y'>
						<MemoizedStudentAnswers
							tasks={pendingStudentAnswers}
							isPending={isPending}
						/>
					</ScrollArea>
				</Tabs.Panel>

				<Tabs.Panel value='replied'>
					<ScrollArea type='auto' h={600} pb='sm' offsetScrollbars='y'>
						<MemoizedStudentAnswers
							tasks={repliedStudentAnswers}
							isPending={isPending}
						/>
					</ScrollArea>
				</Tabs.Panel>
			</Tabs>
		</Center>
	);
}

export default MyTasksPage;
