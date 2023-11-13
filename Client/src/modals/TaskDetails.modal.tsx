import { useRef, useState } from 'react';
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
import useUpdateTaskInfoMutation from '@/hooks/tasks/useUpdateTaskInfoMutation';

function TaskDetailsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; taskId: number }>) {
	const { data: taskInfo, isPending: isQueryPending } = useGetTaskInfoByIdQuery(
		innerProps.taskId
	);
	const [isEditing, setIsEditing] = useState(false);
	const [closeDate, setCloseDate] = useState<Date>(
		dayjs(taskInfo?.taskInfo.closeDate).toDate()
	);
	const [isTypeMarkdown, setIsTypeMarkdown] = useState(
		!!taskInfo?.taskInfo.isMarkdown
	);
	const [question, setQuestion] = useState(taskInfo?.taskInfo.question || '');

	const {
		mutate: updateTask,
		isPending: isMutationPending,
		isSuccess: isMutationSuccess,
	} = useUpdateTaskInfoMutation({
		taskId: innerProps.taskId,
		taskInfo: {
			question,
			closeDate: closeDate,
			isMarkdown: isTypeMarkdown,
		},
	});

	const handleUpdateTask = () => {
		updateTask();
	};

	if (isQueryPending || isMutationPending) {
		return (
			<Center h={300}>
				<Loader />
			</Center>
		);
	}

	if (isMutationSuccess) {
		return (
			<>
				<Center h={80}>
					<Text>Zadanie zostało zaktualizowane</Text>
				</Center>
				<Button fullWidth onClick={() => modals.close(id)}>
					Zamknij
				</Button>
			</>
		);
	}

	return (
		<Stack>
			<Text fw={500}>
				Szczegóły zadania numer&nbsp;
				<Text size='lg' span c='var(--mantine-primary-color)'>
					{taskInfo?.taskInfo.number}
				</Text>{' '}
				dodanego&nbsp;
				<Text span c='var(--mantine-primary-color)'>
					{dayjs(taskInfo?.taskInfo.openDate).format('D/MM/YYYY HH:mm')}
				</Text>
			</Text>
			<Switch
				label='Tryb edycji'
				onChange={() => setIsEditing((prev) => !prev)}
			/>
			<Select
				allowDeselect={false}
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				defaultValue={
					taskInfo?.taskInfo.isMarkdown ? 'Markdown' : 'Zwykły tekst'
				}
				disabled={!isEditing}
				onChange={(value) => {
					setIsTypeMarkdown(value === 'Markdown');
				}}
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
				onChange={(event) => setQuestion(event.currentTarget.value)}
			/>
			<DateTimePicker
				w='100%'
				leftSection={<IconCalendar />}
				label='Data zakończenia'
				minDate={dayjs().toDate()}
				maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
				defaultValue={dayjs(taskInfo?.taskInfo.closeDate).toDate()}
				disabled={!isEditing}
				onChange={(date) => {
					if (date) {
						setCloseDate(dayjs(date).toDate());
					}
				}}
			/>
			{isEditing && (
				<Button fullWidth mt='md' onClick={handleUpdateTask}>
					Aktualizuj zadanie
				</Button>
			)}
		</Stack>
	);
}

export default TaskDetailsModal;
