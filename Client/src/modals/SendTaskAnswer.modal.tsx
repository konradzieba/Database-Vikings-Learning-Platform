import { useSendAnswerMutation } from '@/hooks/answer/useSendAnswerMutation';
import { useGetLessonTaskById } from '@/hooks/tasks/useGetLessonTaskById';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function SendTaskAnswerModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	answerContent: string;
	taskId: number;
	studentId: number;
	modalBody: string;
	lessonId: number;
}>) {
	const { mutate: sendAnswerMutation, isPending, isSuccess, isError } = useSendAnswerMutation();
	const { refetch } = useGetLessonTaskById(innerProps.lessonId, innerProps.taskId);

	const handleSendAnswer = () => {
		if (!innerProps.answerContent) {
			return;
		}

		sendAnswerMutation({
			solution: innerProps.answerContent,
			taskId: innerProps.taskId,
			studentId: innerProps.studentId,
		});
	};

	const handleCloseModal = () => {
		refetch();
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center mih={90}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>Zadanie zostało przesłane do oceny!</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isError) {
		<>
			<Flex direction='column' align='center' gap='md' mb='md'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>Wystąpił problem podczas przesyłania zadania.</Text>
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

export default SendTaskAnswerModal;
