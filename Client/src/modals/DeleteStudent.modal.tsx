import { useDeleteUserMutation } from '@/hooks/users/useDeleteUserMutation';
import { Button, Center, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function DeleteStudentModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; userId: number }>) {
	const {
		mutate: deleteUser,
		isPending,
		isSuccess,
	} = useDeleteUserMutation(+innerProps.userId);

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
				<Center mih={120}>
					<Text>Student został usunięty</Text>
				</Center>
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
				<Button
					color='var(--font-color)'
					miw={150}
					mt='md'
					variant='outline'
					onClick={handleCloseModal}
				>
					Nie
				</Button>
				<Button
					color='var(--bad-state-color)'
					miw={150}
					mt='md'
					onClick={handleDeleteStudent}
				>
					Tak
				</Button>
			</Group>
		</>
	);
}

export default DeleteStudentModal;
