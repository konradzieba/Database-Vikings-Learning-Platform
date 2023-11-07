import { FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSendAnswerMutation } from '@/hooks/answer/useSendAnswerMutation';
import { Flex, Group, Overlay, ScrollArea, Stack, Text, Textarea, ThemeIcon, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconClockHour1, IconClockHour11, IconCode } from '@tabler/icons-react';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import PrimaryButton from '../UI/PrimaryButton';
import classes from './TaskAnswer.component.module.css';
import { useGetLessonTaskById } from '@/hooks/tasks/useGetLessonTaskById';
import FullScreenLoader from '../UI/FullScreenLoader';
import { useStudentStore } from '@/utils/store';
import dayjs from 'dayjs';

interface TaskAnswerFormProps {
	taskId: number;
	studentId: number;
	isTaskExpired: boolean;
}

interface TaskAnswerHeaderProps {
	taskNumber: number;
	lessonNumber: number;
	taskQuestion: string;
}

function TaskAnswerHeader({ taskNumber, lessonNumber, taskQuestion }: TaskAnswerHeaderProps) {
	return (
		<>
			<Title fw={700} py={0} order={2}>
				Zadanie {taskNumber}
			</Title>
			<Text fw={500} size='lg' my='xs'>
				Lekcja {lessonNumber}
			</Text>
			<ScrollArea.Autosize type='auto' mah={280} pb='lg' offsetScrollbars='y'>
				<Text size='md' py='md' px='md' className={classes.taskAnswerQuestionText}>
					{taskQuestion}
				</Text>
			</ScrollArea.Autosize>
		</>
	);
}

function TaskAnswerForm({ taskId, studentId, isTaskExpired }: TaskAnswerFormProps) {
	const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

	const sendAnswerMutation = useSendAnswerMutation();

	const sendAnswer = () => {
		const answer = answerTextareaRef.current?.value;

		if (!answer) {
			return;
		}

		sendAnswerMutation.mutate({
			solution: answer,
			taskId,
			studentId,
		});
	};

	const openConfirmAnswerModal = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		modals.openConfirmModal({
			title: 'Potwierdź przesłanie odpowiedzi',
			children: <Text size='sm'>Czy na pewno chcesz wysłać odpowiedź?</Text>,
			onConfirm: () => {
				sendAnswer();
			},
		});
	};

	return (
		<form onSubmit={openConfirmAnswerModal}>
			<Stack gap='sm' pos='relative'>
				<Group gap='lg' align='flex-start'>
					<ThemeIcon size='lg' variant='transparent'>
						<IconCode size={36} />
					</ThemeIcon>
					<Textarea
						disabled={isTaskExpired}
						ref={answerTextareaRef}
						w='100%'
						size='md'
						rows={8}
						placeholder='Twoja odpowiedź...'
						className={classes.taskAnswerTextArea}
					/>
				</Group>
				{isTaskExpired ? (
					<Group className={classes.taskAnswerPrimaryButton}>
						<Text c='dimmed'>Czas na przesłanie zadania się zakończył</Text>
						<PrimaryButton maw={300} disabled>
							Prześlij
						</PrimaryButton>
					</Group>
				) : (
					<PrimaryButton type='submit' maw={300} className={classes.taskAnswerPrimaryButton}>
						Prześlij
					</PrimaryButton>
				)}
			</Stack>
		</form>
	);
}

function TaskAnswer() {
	const { lessonId, taskId } = useParams();
	const { studentData } = useStudentStore();
	const { data: LessonTask, isPending } = useGetLessonTaskById(+lessonId!, +taskId!);

	const isTaskExpired = dayjs(dayjs().toDate()).isAfter(LessonTask?.taskInfo.closeDate, 'minutes');

	if (isPending) {
		return <FullScreenLoader />;
	}

	return (
		<Flex px='xl' align='flex-start' justify='space-evenly'>
			<Stack w='50%' gap={0}>
				<TaskAnswerHeader
					taskNumber={LessonTask?.taskInfo.number!}
					lessonNumber={LessonTask?.lessonNumber!}
					taskQuestion={LessonTask?.taskInfo.question!}
				/>
				<TaskAnswerForm
					taskId={LessonTask?.taskInfo.id!}
					studentId={studentData.studentId!}
					isTaskExpired={isTaskExpired}
				/>
			</Stack>
			<Group gap='lg' className={classes.taskAnswerDateDisplayGroup}>
				<DateTimeDisplay
					title='Data rozpoczęcia'
					icon={<IconClockHour1 size={20} />}
					date={LessonTask?.taskInfo.openDate!}
				/>
				<DateTimeDisplay
					title='Data zakończenia'
					icon={<IconClockHour11 size={20} />}
					date={LessonTask?.taskInfo.closeDate!}
				/>
			</Group>
		</Flex>
	);
}

export default TaskAnswer;
