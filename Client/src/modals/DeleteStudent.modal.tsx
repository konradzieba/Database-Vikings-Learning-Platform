import { useDeleteUserMutation } from '@/hooks/users/useDeleteUserMutation';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function DeleteStudentModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; userId: number; fullName: string }>) {
	const { mutate: deleteUser, isPending, isSuccess } = useDeleteUserMutation(+innerProps.userId);

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
			<Center mih={70}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex align='center' justify='flex-start' mih={90}>
					<Text>
						Student {innerProps.fullName} został&nbsp;
						<Text span fw={500} c='var(--bad-state-color)'>
							usunięty
						</Text>
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	return (
		<>
			<Text size='sm'>{innerProps.modalBody}</Text>

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
