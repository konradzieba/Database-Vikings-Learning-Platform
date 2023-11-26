
import { useDeleteLessonMutation } from '@/hooks/groups/useDeleteLessonMutation';
import { useMeQuery } from '@/hooks/users/useMeQuery';
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
	groupId: number;
}>) {
	const { mutate, isPending, isSuccess, isError } = useDeleteLessonMutation(
		innerProps.groupId
	);

	const { refetch: refetchMeQuery } = useMeQuery();

	const handleCloseModal = () => {
		refetchMeQuery();
		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteGroup = () => {
		mutate();
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
				<Button miw={150} onClick={handleDeleteGroup}>
					Usuń
				</Button>
			</Group>
		</>
	);
}

export default SendTaskAnswerModal;
