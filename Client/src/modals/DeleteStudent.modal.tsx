import { useDeleteUserMutation } from '@/hooks/users/useDeleteUserMutation';
import { Box, Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function DeleteStudentModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; userId: number; fullName: string }>) {
	const { mutate: deleteUser, isPending, isSuccess, isError } = useDeleteUserMutation(+innerProps.userId);

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteStudent = () => {
		if (!innerProps.userId) {
			return;
		}
		deleteUser();
	};

	if (isPending) {
		return (
			<Center mih={157}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>
						Student {innerProps.fullName} został&nbsp;
						<Text span fw={500} c='var(--bad-state-color)'>
							usunięty
						</Text>
						.
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił problem podczas usuwania studenta.</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	return (
		<>
			<Text size='sm' my='md'>
				{innerProps.modalBody}
			</Text>

			<Group justify='center'>
				<Button color='var(--font-color)' miw={150} mt='md' variant='outline' onClick={handleCloseModal}>
					Nie
				</Button>
				<Button color='var(--bad-state-color)' miw={150} mt='md' onClick={handleDeleteStudent}>
					Tak
				</Button>
			</Group>
		</>
	);
}

export default DeleteStudentModal;
