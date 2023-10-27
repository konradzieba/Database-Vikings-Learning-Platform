import { Button, Group, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function DeleteStudentModal({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) {
	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteStudent = () => {
		context.closeModal(id);
		modals.closeAll();
	};

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
