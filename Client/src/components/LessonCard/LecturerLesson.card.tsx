import {
	ActionIcon,
	Anchor,
	AspectRatio,
	Box,
	Button,
	Flex,
	Group,
	Image,
	Menu,
	Stack,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import classes from './Lesson.card.module.css';
import { IconChecklist, IconDots, IconList, IconPencil, IconTrash } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';

interface LecturerLessonCardProps {
	id: number;
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

function LecturerLessonCard({ id, lessonNumber, taskAmount, isFrequencyChecked, photoLink }: LecturerLessonCardProps) {
	const navigate = useNavigate();
	const isZeroTasks = taskAmount === 0;
	const frequencyColor = isFrequencyChecked ? 'var(--good-state-color)' : 'var(--bad-state-color)';
	return (
		<Flex direction='column' miw={380} px='xs' pt='xs' pb='xl' className={classes.lessonCardWrapper}>
			<Box component={Menu} mr={rem(5)} style={{ alignSelf: 'flex-end' }}>
				<Menu.Target>
					<ActionIcon variant='transparent' c='var(--mantine-primary-color)'>
						<IconDots />
					</ActionIcon>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						component={NavLink}
						to={`../check-frequency`}
						leftSection={<IconChecklist size='1.25rem' />}
						c={!isFrequencyChecked ? 'var(--good-state-color)' : ''}>
						{isFrequencyChecked ? 'Koryguj frekwencję' : 'Sprawdź frekwencję'}
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item leftSection={<IconPencil size='1.25rem' />}>Edytuj lekcję</Menu.Item>
					<Menu.Item variant='' c='var(--bad-state-color)' leftSection={<IconTrash size='1.25rem' />}>
						Usuń lekcję
					</Menu.Item>
				</Menu.Dropdown>
			</Box>
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
			<AspectRatio ratio={1} mah={rem(320)}>
				<Image src={photoLink} alt={`Lesson number ${lessonNumber} photo`} />
			</AspectRatio>
			<Button maw={200} my='lg' mx='auto' onClick={() => navigate(`lesson-dashboard/${id}`)}>
				Przejdź
			</Button>
		</Flex>
	);
}

export default LecturerLessonCard;
