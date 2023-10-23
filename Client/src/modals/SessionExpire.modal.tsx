import { Button, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function SessionExpiredModal({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) {
	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<>
			<Text size='sm'>{innerProps.modalBody}</Text>
			<Button fullWidth mt='md' onClick={handleCloseModal}>
				Rozumiem
			</Button>
		</>
	);
}

export default SessionExpiredModal;
