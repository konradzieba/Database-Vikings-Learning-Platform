import { Button, Flex, Group, Image, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import classes from './Lesson.card.module.css';
import { IconChecklist, IconList } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface LecturerLessonCardProps {
	lessonNumber: number;
	taskAmount: number;
	isFrequencyChecked: boolean;
	photoLink: string;
}

const getTasksPlural = (taskAmount: number) => {
	if (taskAmount === 1) return 'zadanie';
	if (taskAmount > 1 && taskAmount < 5) return 'zadania';
	if (taskAmount >= 5) return 'zadań';
};

function LecturerLessonCard({ lessonNumber, taskAmount, isFrequencyChecked, photoLink }: LecturerLessonCardProps) {
	const navigate = useNavigate();
	const isZeroTasks = taskAmount === 0;
	const frequencyColor = isFrequencyChecked ? 'var(--good-state-color)' : 'var(--bad-state-color)';
	return (
		<Flex direction='column' miw={380} px='xs' py='xl' className={classes.lessonCardWrapper}>
			<Text ta='center' size='xl' fw={500} pb='xs' mt='md'>
				Lekcja&nbsp;{lessonNumber}
			</Text>
			<Stack gap={rem(5)} pb='md' align='center'>
				<Group gap={rem(5)} align='center'>
					<ThemeIcon size='sm' variant='transparent' c='var(--font-color)'>
						<IconList />
					</ThemeIcon>
					<Text size='md'>{isZeroTasks ? `Brak zadań` : `${taskAmount} ${getTasksPlural(taskAmount)}`}</Text>
				</Group>
				<Group gap={rem(5)} align='center'>
					<ThemeIcon size='sm' variant='transparent' c={frequencyColor}>
						<IconChecklist />
					</ThemeIcon>
					<Text size='md' c={frequencyColor}>
						{isFrequencyChecked ? 'Sprawdzona' : 'Niesprawdzona'}
					</Text>
				</Group>
			</Stack>
			<Image src={photoLink} mx='auto' w={rem(340)} h={rem(220)} alt={`Lesson number ${lessonNumber} photo`} />
			<Button maw={200} my='lg' mx='auto' onClick={() => navigate('lessonDashboard')}>
				Przejdź
			</Button>
		</Flex>
	);
}

export default LecturerLessonCard;
