import { Button, Flex, Group, ScrollArea, Stack, Text, Textarea, ThemeIcon, Title } from '@mantine/core';
import { IconClipboardList, IconClockHour1, IconCode } from '@tabler/icons-react';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import classes from '../../components/TaskAnswer/TaskAnswer.component.module.css';
import DateTimeDisplay from '@/components/UI/DateTimeDisplay';
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { modals } from '@mantine/modals';
import { useGetSpecialTaskByIdQuery } from '@/hooks/tasks/useGetSpecialTaskByIdQuery';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import AmountOfSpecialTaskAnswersLeft from '@/components/UI/AmountOfSpecialTaskLeft';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import socket from '@/utils/sockets/socket-instance';
import SocketEvents from '@/utils/sockets/socket-events';

interface TaskAnswerHeaderProps {
	taskTitle: string;
	taskQuestion: string;
	isMarkdown: boolean;
}

interface TaskAnswerFormProps {
	amountOfTask: number;
	specialTaskId: number;
	amount: number | null;
	setAmount: Dispatch<SetStateAction<number | null>>;
}

function SpecialTaskAnswerHeader({ taskTitle, taskQuestion, isMarkdown }: TaskAnswerHeaderProps) {
	return (
		<>
			<Title fw={700} py={0} order={2}>
				{taskTitle}
			</Title>
			<ScrollArea.Autosize type='auto' mah={280} pb='lg' offsetScrollbars='y'>
				{isMarkdown ? (
					<Markdown>{taskQuestion}</Markdown>
				) : (
					<Text size='md' py='md' className={classes.taskAnswerQuestionText}>
						{taskQuestion}
					</Text>
				)}
			</ScrollArea.Autosize>
		</>
	);
}

function SpecialTaskAnswerForm({ amountOfTask, specialTaskId, amount, setAmount }: TaskAnswerFormProps) {
	const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setAmount(amountOfTask);
	}, [amountOfTask]);

	const openConfirmSpecialAnswerModal = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		modals.openContextModal({
			modal: 'sendSpecialTaskAnswer',
			title: 'Potwierdź przesłanie odpowiedzi',
			size: 'md',
			closeOnClickOutside: false,
			innerProps: {
				answerContent: answerTextareaRef.current?.value,
				specialTaskId: specialTaskId,
				modalBody: 'Czy na pewno chcesz wysłać odpowiedź?',
			},
		});
	};
	return (
		<form onSubmit={openConfirmSpecialAnswerModal}>
			<Stack gap='sm' pos='relative'>
				<Group gap='lg' align='flex-start'>
					<Textarea
						disabled={amount === 0 ? true : false}
						leftSection={
							<ThemeIcon variant='transparent'>
								<IconCode />
							</ThemeIcon>
						}
						leftSectionProps={{
							style: {
								alignItems: 'flex-start',
								marginTop: '6px',
								color: 'var(--mantine-primary-color)',
							},
						}}
						ref={answerTextareaRef}
						w='100%'
						size='md'
						rows={8}
						placeholder='Twoja odpowiedz...'
						className={classes.taskAnswerTextArea}
					/>
				</Group>
				<Group justify='flex-end'>
					<Stack w='30%'>
						<AmountOfSpecialTaskAnswersLeft answersLeft={amount!} />
						<Text size='sm' mx='auto' c='dimmed' fs='italic'>
							Ilość pozostałych odpowiedzi na to zadanie
						</Text>
					</Stack>
					<PrimaryButton
						maw={300}
						style={{ alignSelf: 'flex-start' }}
						disabled={amount === 0 ? true : false}
						type='submit'>
						Prześlij
					</PrimaryButton>
				</Group>
			</Stack>
		</form>
	);
}

function SpecialTaskAnswerPage() {
	const navigate = useNavigate();
	const { taskId } = useParams();
	const { studentData } = useStudentStore();
	const { data: specialTaskData, isLoading } = useGetSpecialTaskByIdQuery(+taskId!);

	const [amount, setAmount] = useState<number | null>(null);

	useEffect(() => {
		socket.emit(SocketEvents.connection, () => {});

		socket.emit(SocketEvents.CLIENT.JOIN_ROOM, studentData.lecturerId!.toString());

		socket.on(SocketEvents.CLIENT.REDUCE_AMOUNT_OF_TASKS, ({ specialTaskId }: { specialTaskId: number }) => {
			setAmount(prev => (prev === 0 ? 0 : prev! - 1));
		});
	}, [socket, studentData.lecturerId]);

	return (
		<>
			{isLoading ? (
				<FullScreenLoader />
			) : (
				<Flex direction='column' justify='center'>
					<Button
						leftSection={<IconClipboardList />}
						variant='outline'
						mx='auto'
						onClick={() => navigate('/my-special-tasks')}>
						Moje zadania specjalne
					</Button>
					<Flex px='xl' align='flex-start' justify='space-evenly'>
						<Stack w='50%' gap={0}>
							<SpecialTaskAnswerHeader
								taskTitle={specialTaskData?.specialTaskInfo.title!}
								taskQuestion={specialTaskData?.specialTaskInfo.question!}
								isMarkdown={specialTaskData?.specialTaskInfo.isMarkdown!}
							/>
							<SpecialTaskAnswerForm
								amount={amount}
								setAmount={setAmount}
								amountOfTask={specialTaskData?.specialTaskInfo.numberOfAnswers!}
								specialTaskId={specialTaskData?.specialTaskInfo.id!}
							/>
						</Stack>
						<Stack>
							<Group gap='lg' className={classes.taskAnswerDateDisplayGroup}>
								<DateTimeDisplay
									title='Data rozpoczęcia'
									icon={<IconClockHour1 size={20} />}
									date={specialTaskData?.specialTaskInfo.openDate!}
								/>
							</Group>
						</Stack>
					</Flex>
				</Flex>
			)}
		</>
	);
}

export default SpecialTaskAnswerPage;
