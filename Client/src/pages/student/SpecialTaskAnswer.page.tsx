import { Button, Flex, Group, ScrollArea, Stack, Text, Textarea, ThemeIcon, Title } from '@mantine/core';
import { IconClipboardList, IconClockHour1, IconCode } from '@tabler/icons-react';
import Markdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import classes from '../../components/TaskAnswer/TaskAnswer.component.module.css';
import DateTimeDisplay from '@/components/UI/DateTimeDisplay';
import { FormEvent, useRef } from 'react';
import PrimaryButton from '@/components/UI/PrimaryButton';
import { modals } from '@mantine/modals';

interface TaskAnswerHeaderProps {
	taskNumber: number;
	taskQuestion: string;
	isMarkdown: boolean;
}

function SpecialTaskAnswerHeader({ taskNumber, taskQuestion, isMarkdown }: TaskAnswerHeaderProps) {
	return (
		<>
			<Title fw={700} py={0} order={2}>
				Zadanie specjalne {taskNumber}
			</Title>
			<ScrollArea.Autosize type='auto' mah={280} pb='lg' offsetScrollbars='y'>
				{isMarkdown ? (
					<Markdown>{taskQuestion}</Markdown>
				) : (
					<Text size='md' py='md' className={classes.taskAnswerQuestionText}>
						{taskQuestion}
					</Text>
				)}
			</ScrollArea.Autosize>
		</>
	);
}

function SpecialTaskAnswerForm() {
	const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

	const openConfirmSpecialAnswerModal = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Wysłanie odpowiedzi');

		modals.openContextModal({
			modal: 'sendSpecialTaskAnswer',
			title: 'Potwierdź przesłanie odpowiedzi',
			size: 'md',
			closeOnClickOutside: false,
			innerProps: {
				answerContent: answerTextareaRef.current?.value,
				specialTaskId: 0,
				modalBody: 'Czy na pewno chcesz wysłać odpowiedź?',
			},
		});
	};
	return (
		<form onSubmit={openConfirmSpecialAnswerModal}>
			<Stack gap='sm' pos='relative'>
				<Group gap='lg' align='flex-start'>
					<Textarea
						leftSection={
							<ThemeIcon variant='transparent'>
								<IconCode />
							</ThemeIcon>
						}
						leftSectionProps={{
							style: { alignItems: 'flex-start', marginTop: '6px', color: 'var(--mantine-primary-color)' },
						}}
						ref={answerTextareaRef}
						w='100%'
						size='md'
						rows={8}
						placeholder='Twoja odpowiedz...'
						className={classes.taskAnswerTextArea}
					/>
				</Group>
				<PrimaryButton maw={300} className={classes.taskAnswerPrimaryButton} type='submit'>
					Prześlij
				</PrimaryButton>
			</Stack>
		</form>
	);
}

function SpecialTaskAnswerPage() {
	const navigate = useNavigate();

	return (
		<Flex direction='column' justify='center'>
			<Button
				leftSection={<IconClipboardList />}
				variant='outline'
				mx='auto'
				onClick={() => navigate('/my-special-tasks')}>
				Moje zadania specjalne
			</Button>
			<Flex px='xl' align='flex-start' justify='space-evenly'>
				<Stack w='50%' gap={0}>
					<SpecialTaskAnswerHeader taskNumber={1} taskQuestion='Czy kto to pies' isMarkdown />
					<SpecialTaskAnswerForm />
				</Stack>
				<Stack>
					<Group gap='lg' className={classes.taskAnswerDateDisplayGroup}>
						<DateTimeDisplay
							title='Data rozpoczęcia'
							icon={<IconClockHour1 size={20} />}
							date={'2023-12-17T20:38:13.755Z'}
						/>
					</Group>
				</Stack>
			</Flex>
		</Flex>
	);
}

export default SpecialTaskAnswerPage;
