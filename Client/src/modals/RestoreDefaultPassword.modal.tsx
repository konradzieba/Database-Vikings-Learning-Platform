import useRestoreDefaultPassword from '@/hooks/users/useRestoreDefaultPassword';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function RestoreDefaultPasswordModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	modalBody: string;
	studentId: number;
}>) {
	const {
		mutate: restoreDefaultPassword,
		isPending,
		isError,
		isSuccess,
	} = useRestoreDefaultPassword(innerProps.studentId);
	const handleCloseModal = () => {
		context.closeModal(id);
	};

	const handleRecoverDefaultPassword = () => {
		if (!innerProps.studentId) {
			return;
		}
		restoreDefaultPassword();
	};

	if (isPending) {
		return (
			<Center>
				<Loader h={70} />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>Hasło zostało pomyślnie przywrócone.</Text>
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
					<Text>Wystąpił problem przywracania hasła studenta.</Text>
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
				<Button
					color='var(--font-color)'
					miw={150}
					mt='md'
					variant='outline'
					onClick={handleCloseModal}
				>
					Nie
				</Button>
				<Button miw={150} mt='md' onClick={handleRecoverDefaultPassword}>
					Tak
				</Button>
			</Group>
		</>
	);
}

export default RestoreDefaultPasswordModal;
