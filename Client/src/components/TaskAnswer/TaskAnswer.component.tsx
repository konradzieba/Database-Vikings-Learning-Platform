import { FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSendAnswerMutation } from '@/hooks/answer/useSendAnswerMutation';
import { Flex, Group, ScrollArea, Stack, Text, Textarea, ThemeIcon, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconClockHour1, IconClockHour11, IconCode } from '@tabler/icons-react';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import PrimaryButton from '../UI/PrimaryButton';
import classes from './TaskAnswer.component.module.css';

interface TaskAnswerFormProps {
	taskId: number;
	studentId: number;
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

function TaskAnswerForm({ taskId, studentId }: TaskAnswerFormProps) {
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
			<Stack gap='sm'>
				<Group gap='lg' align='flex-start'>
					<ThemeIcon size='lg' variant='transparent'>
						<IconCode size={36} />
					</ThemeIcon>
					<Textarea
						ref={answerTextareaRef}
						w='100%'
						size='md'
						rows={8}
						placeholder='Twoja odpowiedź...'
						className={classes.taskAnswerTextArea}
					/>
				</Group>
				<PrimaryButton type='submit' maw={300} className={classes.taskAnswerPrimaryButton}>
					Prześlij
				</PrimaryButton>
			</Stack>
		</form>
	);
}

function TaskAnswer() {
	const { id } = useParams();

	const mockData = {
		taskId: +id!,
		lessonNumber: 4,
		taskNumber: 1,
		studentId: 13,
		taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
		openDate: '2023-10-19T19:26:15.000Z',
		closeDate: '2023-10-26T19:26:15.000Z',
	};

	return (
		<Flex px='xl' align='flex-start' justify='space-between'>
			<Stack w='50%' gap={0}>
				<TaskAnswerHeader
					taskNumber={mockData.taskNumber}
					lessonNumber={mockData.lessonNumber}
					taskQuestion={mockData.taskQuestion}
				/>
				<TaskAnswerForm taskId={mockData.taskId} studentId={mockData.studentId} />
			</Stack>
			<Group gap='lg' className={classes.taskAnswerDateDisplayGroup}>
				<DateTimeDisplay title='Data rozpoczęcia' icon={<IconClockHour1 size={20} />} date={mockData.openDate} />
				<DateTimeDisplay title='Data zakończenia' icon={<IconClockHour11 size={20} />} date={mockData.closeDate} />
			</Group>
		</Flex>
	);
}

export default TaskAnswer;
