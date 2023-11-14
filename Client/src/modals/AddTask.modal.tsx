import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button, Select, Stack, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCalendar, IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { TaskProps } from '@/pages/lecturer/CreateLesson.page';

interface AddTaskModalProps {
	modalBody: string;
	setTasks: Dispatch<SetStateAction<TaskProps[]>>;
	tasksLength: number;
}

function AddTaskModal({ innerProps, context, id }: ContextModalProps<AddTaskModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().add(7, 'days').endOf('day').toDate());

	const handleAddTask = () => {
		console.log('data', selectedDate?.toDateString());
		innerProps.setTasks(prevState => [
			...prevState,
			{
				number: innerProps.tasksLength + 1,
				question: textAreaRef.current?.value!,
				closeDate: selectedDate?.toDateString()!,
				isMarkDown: false,
				isExtra: false,
			},
		]);

		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<Stack>
			<Select
				allowDeselect={false}
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				defaultValue='Zwykły tekst'
			/>
			<Textarea
				ref={textAreaRef}
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
			<Button fullWidth mt='md' onClick={handleAddTask}>
				Dodaj zadanie
			</Button>
		</Stack>
	);
}

export default AddTaskModal;
