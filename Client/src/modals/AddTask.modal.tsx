import { Button, Select, Stack, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconCalendar,
	IconFloatLeft,
	IconListDetails,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

function AddTaskModal({
	context,
	id,
}: ContextModalProps<{ modalBody: string; width: number }>) {
	const handleAddTask = () => {
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
