import { Button, Flex, Group, Select, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function StudentGroupChangeModal({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) {
	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleChangeStudentGroup = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<Flex direction='column' gap='sm'>
			<Text>
				Obecna grupa{' '}
				<Text span fw={500} c='var(--mantine-primary-color)'>
					{innerProps.modalBody}
				</Text>
			</Text>
			<Select label='Wybierz grupę' placeholder='Grupa...' data={['III-ISI', 'II-IO', 'I-ISI']} />
			<Group justify='center' mt='sm'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleChangeStudentGroup}>
					Przenieś
				</Button>
			</Group>
		</Flex>
	);
}

export default StudentGroupChangeModal;
