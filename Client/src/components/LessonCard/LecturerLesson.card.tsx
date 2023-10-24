import {
	Button,
	Flex,
	Group,
	Image,
	Progress,
	Stack,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import lesson1 from '../../assets/lesson1.png';
import classes from './Lesson.card.module.css';
import { IconBooks, IconChecklist, IconList } from '@tabler/icons-react';

const mockLessonData = {
	lessonNumber: 1,
	taskAmount: 13,
	isCheckedFalse: false,
	isCheckedTrue: true,
	photoLink: lesson1,
};

const getTasksPlural = (taskAmount: number) => {
	if (taskAmount === 1) return 'zadanie';
	if (taskAmount > 1 && taskAmount < 5) return 'zadania';
	if (taskAmount >= 5) return 'zadań';
};

function LecturerLessonCard() {
	const isZeroTasks = mockLessonData.taskAmount === 0;
	const isFrequencyChecked = mockLessonData.isCheckedTrue;
	const frequencyColor = isFrequencyChecked
		? 'var(--good-state-color)'
		: 'var(--bad-state-color)';
	return (
		<Flex
			direction='column'
			miw={380}
			px='xs'
			py='xl'
			className={classes.lessonCardWrapper}
		>
			<Text ta='center' size='xl' fw={500} pb='xs' mt='md'>
				Lekcja&nbsp;{mockLessonData.lessonNumber}
			</Text>
			<Stack gap={rem(5)} pb='md' align='center'>
				<Group gap={rem(5)}>
					<ThemeIcon variant='transparent' c='var(--font-color)'>
						<IconList />
					</ThemeIcon>
					<Text size='md'>
						{isZeroTasks
							? `Brak zadań`
							: `${mockLessonData.taskAmount} ${getTasksPlural(
									mockLessonData.taskAmount
							  )}`}
					</Text>
				</Group>
				<Group gap={rem(5)}>
					<ThemeIcon variant='transparent' c={frequencyColor}>
						<IconChecklist />
					</ThemeIcon>
					<Text size='md' c={frequencyColor}>
						{isFrequencyChecked ? 'Sprawdzona' : 'Niesprawdzona'}
					</Text>
				</Group>
			</Stack>
			<Image
				src={mockLessonData.photoLink}
				mx='auto'
				w={rem(340)}
				h={rem(220)}
				alt={`Lesson number ${mockLessonData.lessonNumber} photo`}
			/>
			<Button maw={200} my='lg' mx='auto'>
				Przejdź
			</Button>
		</Flex>
	);
}

export default LecturerLessonCard;
