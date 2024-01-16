import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';
import { Button, Group, Select, Stack, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCalendar, IconFloatLeft, IconListDetails, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';

interface AddTaskModalProps {
	modalBody: string;
	groupId: number;
	number: number;
	question: string;
	closeDate: string;
	isMarkdown: boolean;
}

function ModifyAddedTaskModal({ innerProps, context, id }: ContextModalProps<AddTaskModalProps>) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [isTextAreaError, setIsTextAreaError] = useState(false);
	const [questionDetails, setQuestionDetails] = useState<string>(innerProps.question);
	const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs(innerProps.closeDate).toDate());
	const [textFormat, setTextFormat] = useState<string | null>(innerProps.isMarkdown ? 'Markdown' : 'Zwykły tekst');

	const { createdLessonsArray, updateLesson } = useCreateLessonStore();

	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === innerProps.groupId);

	const handleAddTask = () => {
		if (textAreaRef.current?.value === '') {
			setIsTextAreaError(true);
			return;
		}

		const taskIndex = lessonFromGroup?.tasks.findIndex(task => task.number === innerProps.number);
		if (taskIndex !== -1 && lessonFromGroup) {
			const updatedTask = {
				number: innerProps.number,
				question: questionDetails,
				closeDate: selectedDate?.toISOString()!,
				isMarkdown: textFormat === 'Markdown' ? true : false,
			};

			const updatedTasks = [...lessonFromGroup.tasks];
			updatedTasks[taskIndex!] = updatedTask;

			const updatedLessonFromGroup = { ...lessonFromGroup, tasks: updatedTasks };

			updateLesson(innerProps.groupId, updatedLessonFromGroup);
		}

		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteTask = () => {
		const taskIndex = lessonFromGroup?.tasks.findIndex(task => task.number === innerProps.number);

		if (taskIndex !== -1 && lessonFromGroup) {
			const updatedTasks = lessonFromGroup.tasks
				.filter(task => task.number !== innerProps.number)
				.map(task => {
					if (task.number > innerProps.number) {
						return { ...task, number: task.number - 1 };
					}
					return task;
				});

			const updatedLessonFromGroup = { ...lessonFromGroup, tasks: updatedTasks };
			updateLesson(innerProps.groupId, updatedLessonFromGroup);
		}

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
			<Group mt='md' justify='space-between'>
				<Button
					variant='outline'
					color='var(--bad-state-color)'
					miw={150}
					leftSection={<IconTrash />}
					onClick={handleDeleteTask}>
					Usuń
				</Button>
				<Group justify='center'>
					<Button miw={150} variant='outline' onClick={handleCloseModal}>
						Anuluj
					</Button>
					<Button miw={150} onClick={handleAddTask} disabled={isTextAreaError}>
						Modyfikuj zadanie
					</Button>
				</Group>
			</Group>
		</Stack>
	);
}

export default ModifyAddedTaskModal;
