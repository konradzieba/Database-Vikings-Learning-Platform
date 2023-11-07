import { Button, FileInput, Group, Stack, TextInput } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconFile, IconTag } from '@tabler/icons-react';

function CreateGroupModal({ context, id }: ContextModalProps) {
	const handleCreateGroup = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<>
			<Stack mb='xl' gap='xl'>
				<TextInput label='Nazwa grupy' leftSection={<IconTag size='1.4rem' />} />
				<FileInput label='Lista studentów' leftSection={<IconFile size='1.4rem' />} />
			</Stack>
			<Group justify='center'>
				<Button variant='outline' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleCreateGroup}>
					Stwórz
				</Button>
			</Group>
		</>
	);
}

export default CreateGroupModal;
