import { Button, Group, Select, Stack, Text, Textarea } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import { useRef, useState } from 'react';

interface CreateSpecialTaskModalProps {
	modalBody: string;
}

function CreateSpecialTaskModal({ innerProps, context, id }: ContextModalProps<CreateSpecialTaskModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [textFormat, setTextFormat] = useState<string | null>('Zwykły tekst');

	const handleAddSpecialTask = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<Stack>
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
				<Button disabled={isTextAreaError} miw={150} onClick={handleAddSpecialTask}>
					Stwórz
				</Button>
			</Group>
		</Stack>
	);
}

export default CreateSpecialTaskModal;
