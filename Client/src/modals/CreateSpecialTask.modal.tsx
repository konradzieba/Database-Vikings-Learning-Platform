import SocketEvents from '@/utils/sockets/socket-events';
import socket from '@/utils/sockets/socket-instance';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Button, Center, Flex, Group, Loader, Select, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX, IconFloatLeft, IconListDetails, IconTag } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

interface CreateSpecialTaskModalProps {
	modalBody: string;
}

function CreateSpecialTaskModal({ innerProps, context, id }: ContextModalProps<CreateSpecialTaskModalProps>) {
	const { lecturerData } = useLecturerStore();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const textInputRef = useRef<HTMLInputElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [isNameInputError, setIsNameInputError] = useState(false);
	const [textFormat, setTextFormat] = useState<string | null>('Zwykły tekst');
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [isCreatingError, setIsCreatingError] = useState(false);

	useEffect(() => {
		socket.emit(SocketEvents.connection, () => {});

		socket.emit(SocketEvents.CLIENT.JOIN_ROOM, lecturerData.lecturerId!.toString());

		socket.on(SocketEvents.SERVER.ERROR_CREATING_SPECIAL_TASK, ({ error }: { error: boolean }) => {
			setIsSending(false);
			setIsCreatingError(true);
		});

		socket.on(SocketEvents.SERVER.SUCCESS_CREATING_SPECIAL_TASK, ({ success }: { success: boolean }) => {
			setIsSending(false);
			setIsSent(true);
		});

		// return () => {
		// 	socket.disconnect();
		// };
	}, [socket, lecturerData.lecturerId]);

	const sendCreatedSpecialTask = () => {
		socket.emit(SocketEvents.SERVER.RECEIVE_CREATED_SPECIAL_TASK, {
			question: textAreaRef.current?.value!,
			isMarkdown: textFormat === 'Markdown' ? true : false,
			title: textInputRef.current?.value!,
			lecturerId: lecturerData.lecturerId,
		});
	};

	const handleAddSpecialTask = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}
		if (textInputRef.current?.value === '') {
			setIsNameInputError(true);
			return;
		}
		sendCreatedSpecialTask();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isSending) {
		return (
			<Center mih={120}>
				<Loader />
			</Center>
		);
	}

	if (isSent) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
					<Text>Zadanie specjalne zostało stworzone</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isCreatingError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił błąd podczas tworzenia zadania specjalnego</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	return (
		<Stack>
			<TextInput
				label='Tytuł zadania'
				placeholder='Tytuł zadania...'
				ref={textInputRef}
				error={isNameInputError ? 'Tytuł zadania nie może być pusty' : ''}
				leftSection={<IconTag />}
				onChange={value => (value.currentTarget.value === '' ? setIsNameInputError(true) : setIsNameInputError(false))}
			/>
			<Select
				value={textFormat}
				onChange={value => setTextFormat(value)}
				allowDeselect={false}
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				defaultValue='Zwykły tekst'
			/>
			<Textarea
				ref={textAreaRef}
				error={isTextAreaError ? 'Treść zadania nie może być pusta' : ''}
				onChange={value => (value.currentTarget.value === '' ? setIsTextAreaError(true) : setIsTextAreaError(false))}
				leftSection={<IconFloatLeft />}
				leftSectionProps={{
					style: { alignItems: 'flex-start', marginTop: '3px' },
				}}
				label='Treść'
				minRows={7}
				autosize
				maxRows={10}
				placeholder='Treść zadania...'
			/>
			<Text ta='center' c='dimmed' fs='italic'>
				Zadanie specjalne zostanie stworzone dla studentów ze wszystkich Twoich grup.
			</Text>
			<Text ta='center' c='dimmed' fs='italic'>
				Po stworzeniu zadania nie będzie można go edytować.
			</Text>
			<Group mx='auto'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button disabled={isTextAreaError || isNameInputError} miw={150} onClick={handleAddSpecialTask}>
					Stwórz
				</Button>
			</Group>
		</Stack>
	);
}

export default CreateSpecialTaskModal;
