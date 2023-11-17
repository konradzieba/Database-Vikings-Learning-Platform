import { useRef, useState } from 'react';
import { Button, Select, Stack, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCalendar, IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

interface AddTaskModalProps {
	modalBody: string;
	groupId: number;
}

function AddTaskModal({ innerProps, context, id }: ContextModalProps<AddTaskModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().add(7, 'days').endOf('day').toDate());
	const [textFormat, setTextFormat] = useState<string | null>('Zwykły tekst');

	const { createdLessonsArray, updateLesson } = useCreateLessonStore();

	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === innerProps.groupId);

	const handleAddTask = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}

		if (lessonFromGroup) {
			const updatedLessonFromGroup = {
				...lessonFromGroup,
				tasks: [
					...lessonFromGroup.tasks,
					{
						number: lessonFromGroup.tasks.length + 1,
						question: textAreaRef.current?.value!,
						closeDate: selectedDate?.toISOString()!,
						isMarkdown: textFormat === 'Markdown' ? true : false,
						isExtra: false,
					},
				],
			};
			updateLesson(innerProps.groupId, updatedLessonFromGroup);
		}

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
				error={isTextAreaError ? 'Teść zadania nie może być pusta' : ''}
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
			<Button fullWidth mt='md' onClick={handleAddTask} disabled={isTextAreaError}>
				Dodaj zadanie
			</Button>
		</Stack>
	);
}

export default AddTaskModal;
