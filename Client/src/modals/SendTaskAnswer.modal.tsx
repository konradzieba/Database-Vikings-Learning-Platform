import { useSendAnswerMutation } from '@/hooks/answer/useSendAnswerMutation';
import { useGetLessonTaskById } from '@/hooks/tasks/useGetLessonTaskById';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

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
	const { mutate: sendAnswerMutation, isPending, isSuccess } = useSendAnswerMutation();
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
				<Flex align='center' justify='flex-start' mih={90}>
					<Text>Zadanie zostało przesłane od oceny!</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
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
