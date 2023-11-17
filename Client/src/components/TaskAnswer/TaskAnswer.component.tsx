import { FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Group, ScrollArea, Stack, Text, Textarea, ThemeIcon, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconClockHour1, IconClockHour11, IconCode } from '@tabler/icons-react';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import PrimaryButton from '../UI/PrimaryButton';
import classes from './TaskAnswer.component.module.css';
import { useGetLessonTaskById } from '@/hooks/tasks/useGetLessonTaskById';
import FullScreenLoader from '../UI/FullScreenLoader';
import dayjs from 'dayjs';
import { useStudentStore } from '@/utils/stores/useStudentStore';

interface TaskAnswerFormProps {
	lessonId: number;
	taskId: number;
	studentId: number;
	isTaskExpired: boolean;
	solution: string;
	answerDate: string;
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
				<Text size='md' py='md' className={classes.taskAnswerQuestionText}>
					{taskQuestion}
				</Text>
			</ScrollArea.Autosize>
		</>
	);
}

function TaskAnswerForm({ lessonId, taskId, studentId, isTaskExpired, answerDate, solution }: TaskAnswerFormProps) {
	const answerTextareaRef = useRef<HTMLTextAreaElement>(null);
	const openConfirmAnswerModal = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		modals.openContextModal({
			modal: 'sendTaskAnswer',
			title: 'Potwierdź przesłanie odpowiedzi',
			size: 'md',
			closeOnClickOutside: false,
			innerProps: {
				answerContent: answerTextareaRef.current?.value,
				taskId: taskId,
				studentId: studentId,
				lessonId: lessonId,
				modalBody: 'Czy na pewno chcesz wysłać odpowiedź?',
			},
		});
	};

	return (
		<form onSubmit={openConfirmAnswerModal}>
			<Stack gap='sm' pos='relative'>
				<Group gap='lg' align='flex-start'>
					{!solution ? (
						<Textarea
							leftSection={
								<ThemeIcon variant='transparent'>
									<IconCode />
								</ThemeIcon>
							}
							leftSectionProps={{
								style: { alignItems: 'flex-start', marginTop: '6px', color: 'var(--mantine-primary-color)' },
							}}
							disabled={isTaskExpired}
							ref={answerTextareaRef}
							w='100%'
							size='md'
							rows={8}
							placeholder='Twoja odpowiedź...'
							className={classes.taskAnswerTextArea}
						/>
					) : (
						<Textarea
							leftSection={
								<ThemeIcon variant='transparent'>
									<IconCode />
								</ThemeIcon>
							}
							leftSectionProps={{
								style: { alignItems: 'flex-start', marginTop: '6px', color: 'var(--mantine-primary-color)' },
							}}
							disabled
							ref={answerTextareaRef}
							w='100%'
							size='md'
							rows={8}
							placeholder={solution}
							className={classes.taskAnswerTextArea}
						/>
					)}
				</Group>
				{isTaskExpired && (
					<Group className={classes.taskAnswerPrimaryButton}>
						<Text c='dimmed'>Czas na przesłanie zadania się zakończył</Text>
						<PrimaryButton maw={300} disabled>
							Prześlij
						</PrimaryButton>
					</Group>
				)}
				{answerDate && (
					<Group className={classes.taskAnswerPrimaryButton}>
						<Text c='dimmed'>Zadanie zostało przesłane</Text>
						<PrimaryButton maw={300} disabled>
							Prześlij
						</PrimaryButton>
					</Group>
				)}
				{!isTaskExpired && !answerDate && (
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
					lessonId={+lessonId!}
					taskId={LessonTask?.taskInfo.id!}
					studentId={studentData.studentId!}
					isTaskExpired={isTaskExpired}
					answerDate={LessonTask?.answer.sendDate!}
					solution={LessonTask?.answer.solution!}
				/>
			</Stack>
			<Stack>
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
				{LessonTask?.answer.sendDate && (
					<Group gap='lg' className={classes.taskAnswerDateDisplayGroup} justify='flex-end'>
						<DateTimeDisplay
							title='Data przesłania'
							icon={<IconClockHour1 size={20} />}
							date={LessonTask.answer.sendDate}
						/>
					</Group>
				)}
			</Stack>
		</Flex>
	);
}

export default TaskAnswer;
