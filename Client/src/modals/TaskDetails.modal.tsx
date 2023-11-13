import { useState } from 'react';
import {
	Button,
	Center,
	Loader,
	Select,
	Stack,
	Switch,
	Text,
	Textarea,
	rem,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import useGetTaskInfoByIdQuery from '@/hooks/tasks/useGetTaskInfoByIdQuery';
import {
	IconCalendar,
	IconFloatLeft,
	IconListDetails,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

function TaskDetailsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; taskId: number }>) {
	const [isEditing, setIsEditing] = useState(false);

	const {
		data: taskInfo,
		isPending,
		isSuccess,
	} = useGetTaskInfoByIdQuery(innerProps.taskId);

	const handleAddTask = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center h={300}>
				<Loader />
			</Center>
		);
	}

	return (
		<Stack>
			<Text fw={500}>
				Szczegóły zadania numer{' '}
				<Text size='lg' span c='var(--mantine-primary-color)'>
					{taskInfo?.taskInfo.number}
				</Text>
			</Text>
			<Switch
				label='Tryb edycji'
				onChange={() => setIsEditing((prev) => !prev)}
			/>
			<Select
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				defaultValue={
					taskInfo?.taskInfo.isMarkdown ? 'Markdown' : 'Zwykły tekst'
				}
				disabled={!isEditing}
			/>
			<Textarea
				leftSection={<IconFloatLeft />}
				leftSectionProps={{
					style: { alignItems: 'flex-start', marginTop: rem(3) },
				}}
				label='Treść'
				minRows={7}
				autosize
				maxRows={10}
				placeholder='Treść zadania...'
				defaultValue={taskInfo?.taskInfo.question}
				disabled={!isEditing}
			/>
			<DateTimePicker
				w='100%'
				leftSection={<IconCalendar />}
				label='Data zakończenia'
				minDate={dayjs().toDate()}
				maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
				defaultValue={dayjs(taskInfo?.taskInfo.closeDate).toDate()}
				disabled={!isEditing}
			/>
			{isEditing && (
				<Button fullWidth mt='md' onClick={handleAddTask}>
					Aktualizuj zadanie
				</Button>
			)}
		</Stack>
	);
}

export default TaskDetailsModal;
