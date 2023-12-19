import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function SendSpecialTaskAnswerModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	answerContent: string;
	specialTaskId: number;
	modalBody: string;
}>) {
	const handleSendAnswer = () => {
		if (!innerProps.answerContent) {
			return;
		}

		//mutation to send special task answer
	};

	const handleCloseModal = () => {
		// refetch
		context.closeModal(id);
		modals.closeAll();
	};

	// If mutation is pending
	// if (isPending) {
	// 	return (
	// 		<Center mih={90}>
	// 			<Loader />
	// 		</Center>
	// 	);
	// }

	// If mutation is success
	// if (isSuccess) {
	// 	return (
	// 		<>
	// 			<Flex direction='column' align='center' gap='md' mb='md'>
	// 				<IconCircleCheck size='3rem' color='var(--good-state-color)' />
	// 				<Text>Zadanie specjalne zostało przesłane do oceny!</Text>
	// 			</Flex>
	// 			<Button fullWidth onClick={handleCloseModal}>
	// 				Zamknij
	// 			</Button>
	// 		</>
	// 	);
	// }

	// If mutation error
	// if (isError) {
	// 	<>
	// 		<Flex direction='column' align='center' gap='md' mb='md'>
	// 			<IconCircleX size='3rem' color='var(--bad-state-color)' />
	// 			<Text>Wystąpił problem podczas przesyłania zadania specjalnego.</Text>
	// 		</Flex>
	// 		<Button fullWidth onClick={handleCloseModal}>
	// 			Rozumiem
	// 		</Button>
	// 	</>;
	// }

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
