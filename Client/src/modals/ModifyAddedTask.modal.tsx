import { TaskProps } from '@/pages/lecturer/CreateLesson.page';
import { Button, Group, Select, Stack, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCalendar, IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState, useRef } from 'react';

interface AddTaskModalProps {
	modalBody: string;
	number: number;
	question: string;
	closeDate: string;
	isMarkdown: boolean;
	isExtra: boolean;
	tasks: TaskProps[];
	setTasks: Dispatch<SetStateAction<TaskProps[]>>;
}

function ModifyAddedTaskModal({ innerProps, context, id }: ContextModalProps<AddTaskModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [questionDetails, setQuestionDetails] = useState<string>(innerProps.question);
	const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs(innerProps.closeDate).toDate());
	const [textFormat, setTextFormat] = useState<string | null>(innerProps.isMarkdown ? 'Markdown' : 'Zwykły tekst');

	const handleAddTask = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}

		const taskIndex = innerProps.tasks.findIndex(task => task.number === innerProps.number);

		innerProps.setTasks(prevState => [
			...prevState.slice(0, taskIndex),
			{
				number: innerProps.number,
				question: questionDetails,
				closeDate: selectedDate?.toISOString()!,
				isMarkdown: textFormat === 'Markdown' ? true : false,
				isExtra: false,
			},
			...prevState.slice(taskIndex + 1),
		]);

		context.closeModal(id);
		modals.closeAll();
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
			/>
			<Textarea
				ref={textAreaRef}
				value={questionDetails}
				error={isTextAreaError ? 'Treść zadania nie może być pusta' : ''}
				onChange={value => {
					if (value.currentTarget.value === '') {
						setIsTextAreaError(true);
					} else {
						setIsTextAreaError(false);
					}
					setQuestionDetails(value.currentTarget.value);
				}}
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
				w='100%'
			/>
			<Group mt='md' justify='center'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleAddTask} disabled={isTextAreaError}>
					Modyfikuj zadanie
				</Button>
			</Group>
		</Stack>
	);
}

export default ModifyAddedTaskModal;
