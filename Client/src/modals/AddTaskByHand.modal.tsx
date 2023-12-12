import useCreateTaskMutation from '@/hooks/tasks/useCreateTaskMutation';
import { Button, Center, Flex, Group, Loader, Select, Stack, Text, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCalendar, IconCircleCheck, IconCircleX, IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

interface AddTaksByHandModalProps {
	lessonId: number;
	taskNumber: number;
}

function AddTaskByHandModal({ innerProps, context, id }: ContextModalProps<AddTaksByHandModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().add(7, 'days').endOf('day').toDate());
	const [textFormat, setTextFormat] = useState<string | null>('Zwykły tekst');

	const { mutate: createTaskMutation, isPending, isSuccess, isError } = useCreateTaskMutation();

	const handleAddTaskByHand = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}
		createTaskMutation({
			lessonId: +innerProps.lessonId,
			number: +innerProps.taskNumber,
			question: textAreaRef.current?.value!,
			closeDate: selectedDate?.toISOString()!,
			isExtra: false,
			isMarkdown: textFormat === 'Markdown' ? true : false,
		});
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center h={120}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>
						Zadanie {innerProps.taskNumber} zostało stworzone&nbsp;
						<Text span fw={500} c='var(--mantine-primary-color)'>
							pomyślnie
						</Text>
						.
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił problem podczas tworzenia zadania.</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	return (
		<>
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
				<DateTimePicker
					onChange={date => setSelectedDate(date)}
					value={selectedDate}
					leftSection={<IconCalendar />}
					label='Data zakończenia'
					minDate={dayjs().toDate()}
					maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
					defaultValue={dayjs().add(7, 'days').endOf('day').toDate()}
					w='100%'
				/>
				<Group justify='center'>
					<Button variant='outline' miw={150} onClick={handleCloseModal}>
						Anuluj
					</Button>
					<Button miw={150} onClick={handleAddTaskByHand} disabled={isTextAreaError}>
						Dodaj zadanie
					</Button>
				</Group>
			</Stack>
		</>
	);
}

export default AddTaskByHandModal;
