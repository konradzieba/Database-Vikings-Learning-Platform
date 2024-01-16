import { TemporarySpecialTaskAnswerData } from '@/pages/student/SpecialTaskAnswer.page';
import SocketEvents from '@/utils/sockets/socket-events';
import socket from '@/utils/sockets/socket-instance';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function SendSpecialTaskAnswerModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	answerContent: string;
	specialTaskId: number;
	modalBody: string;
	setTemporaryData: Dispatch<SetStateAction<TemporarySpecialTaskAnswerData>>;
}>) {
	const { studentData } = useStudentStore();
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [isCreatingError, setIsCreatingError] = useState(false);
	const [isThereMoreAnswers, setIsThereMoreAnswers] = useState(false);

	useEffect(() => {
		socket.emit(SocketEvents.connection, () => {});

		socket.emit(SocketEvents.CLIENT.JOIN_ROOM, studentData.lecturerId!.toString());

		socket.on(SocketEvents.SERVER.SUCCESS_CREATING_SPECIAL_TASK_ANSWER, ({ success }: { success: boolean }) => {
			setIsSending(false);
			setIsSent(true);
		});

		socket.on(SocketEvents.SERVER.ERROR_CREATING_SPECIAL_TASK_ANSWER, ({ error }: { error: boolean }) => {
			setIsSending(false);
			setIsCreatingError(true);
		});

		socket.on(SocketEvents.SERVER.STATUS_NO_MORE_ANSWERS_LEFT, ({ status }: { status: boolean }) => {
			setIsSending(false);
			setIsThereMoreAnswers(true);
		});
	}, [socket, studentData.lecturerId]);

	const handleSendAnswer = () => {
		if (!innerProps.answerContent) {
			return;
		}

		socket.emit(SocketEvents.SERVER.RECEIVE_SPECIAL_TASK_ANSWER, {
			answerData: {
				solution: innerProps.answerContent,
				specialTaskId: innerProps.specialTaskId,
				studentId: studentData.studentId,
			},
			lecturerId: studentData.lecturerId,
		});
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleSentCloseModal = () => {
		innerProps.setTemporaryData({
			temporarySolution: innerProps.answerContent,
			temporarySendDate: dayjs().toISOString(),
		});
		context.closeModal(id);
		modals.closeAll();
	};

	if (isSending) {
		return (
			<Center mih={90}>
				<Loader />
			</Center>
		);
	}

	if (isThereMoreAnswers) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconInfoCircle size='3rem' color='var(--neutral-state-color)' />
					<Text>Limit odpowiedzi na to zadanie został wyczerpany</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isSent) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />

					<Text>Zadanie specjalne zostało przesłane do oceny!</Text>
				</Flex>
				<Button fullWidth onClick={handleSentCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isCreatingError) {
		<>
			<Flex direction='column' align='center' gap='md' mb='md'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>Wystąpił problem podczas przesyłania zadania specjalnego.</Text>
			</Flex>
			<Button fullWidth onClick={handleCloseModal}>
				Rozumiem
			</Button>
		</>;
	}

	return (
		<>
			<Text mb='md'>{innerProps.modalBody}</Text>
			<Group justify='center'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleSendAnswer}>
					Prześlij
				</Button>
			</Group>
		</>
	);
}

export default SendSpecialTaskAnswerModal;
