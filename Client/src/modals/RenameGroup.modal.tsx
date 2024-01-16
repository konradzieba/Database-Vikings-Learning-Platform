import React, { useRef, useState } from 'react';
import {
	Box,
	Button,
	Center,
	Flex,
	FocusTrap,
	Group,
	Loader,
	Text,
	TextInput,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { useRenameGroupMutation } from '@/hooks/groups/useRenameGroupMutation';

function RenameGroupModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	groupName: string;
	groupId: number;
}>) {
	const [newGroupName, setNewGroupName] = useState('');
	const [newGroupNameInputError, setNewGroupNameInputError] = useState('');

	const {
		mutate: renameGroup,
		isPending: isMutationLoading,
		isSuccess: isMutationSuccess,
		isError: isMutationError,
	} = useRenameGroupMutation(innerProps.groupId, newGroupName);

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleRenameGroup = () => {
		const regex = /^[^<>;'[\]\\]+$/;
		console.log(newGroupName);
		if (!newGroupName || newGroupName === '') {
			setNewGroupNameInputError('Nazwa grupy nie może być pusta');
			return;
		}

		if (!regex.test(newGroupName)) {
			setNewGroupNameInputError('Nazwa grupy zawiera niedozwolone znaki');
			return;
		}

		renameGroup();
	};

	if (isMutationLoading) {
		return (
			<Center mih={90}>
				<Loader />
			</Center>
		);
	}

	if (isMutationSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
					<Text>Nazwa grupy została zmieniona!</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isMutationError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>
						Wystąpił problem podczas&nbsp;
						{isMutationError
							? 'zmiany nazwy grupy'
							: 'wczytywania danych grupy'}
						.
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	return (
		<Box p='sm'>
			<TextInput
				label={
					<Text size='sm'>
						Nowa nazwa dla&nbsp;
						<Text span fw={500} c='var(--mantine-primary-color-lighter)'>
							{innerProps.groupName}
						</Text>
					</Text>
				}
				placeholder='Nowa nazwa grupy...'
				error={newGroupNameInputError}
				onChange={(e) => {
					setNewGroupName(e.currentTarget.value);
					setNewGroupNameInputError('');
				}}
			/>

			<Group mt='xl' justify='center'>
				<Button variant='default' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleRenameGroup}>
					Zmień nazwę
				</Button>
			</Group>
		</Box>
	);
}

export default RenameGroupModal;
