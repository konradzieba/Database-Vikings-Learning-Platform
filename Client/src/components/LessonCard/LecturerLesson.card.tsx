import {
	ActionIcon,
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
import {
	IconChecklist,
	IconDots,
	IconList,
	IconMenuOrder,
	IconPencil,
	IconTrash,
} from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';

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

const handleOpenReorderLessonModal = (groupId: number) => {
	modals.openContextModal({
		modal: 'reorderLessons',
		title: 'Zmiana kolejność lekcji',
		size: 'xl',
		// fullScreen: true,
		
		innerProps: {
			groupId,
		},
	});
};

const handleOpenDeleteLessonModal = (lessonId: number) => {
	modals.openContextModal({
		modal: 'deleteLesson',
		title: 'Usuwanie lekcji',
		size: 'lg',
		innerProps: {
			lessonId,
		},
	});
};

function LecturerLessonCard({
	id,
	lessonNumber,
	taskAmount,
	isFrequencyChecked,
	photoLink,
}: LecturerLessonCardProps) {
	const { id: groupId } = useParams();
	const isZeroTasks = taskAmount === 0;
	const frequencyColor = isFrequencyChecked
		? 'var(--good-state-color)'
		: 'var(--bad-state-color)';
	return (
		<Flex
			direction='column'
			miw={380}
			px='xs'
			pt='xs'
			pb='xl'
			className={classes.lessonCardWrapper}
		>
			<Box component={Menu} mr={rem(5)} className={classes.menuWrapper}>
				<Menu.Target>
					<ActionIcon variant='transparent' c='var(--mantine-primary-color)'>
						<IconDots />
					</ActionIcon>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						component={Link}
						to={`../check-frequency`}
						leftSection={<IconChecklist size='1.25rem' />}
						c={!isFrequencyChecked ? 'var(--good-state-color)' : ''}
					>
						{isFrequencyChecked ? 'Koryguj frekwencję' : 'Sprawdź frekwencję'}
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item
						leftSection={<IconMenuOrder size='1.25rem' />}
						onClick={() => {
							handleOpenReorderLessonModal(+groupId!);
						}}
					>
						Zmień kolejność
					</Menu.Item>
					<Menu.Item
						variant=''
						c='var(--bad-state-color)'
						leftSection={<IconTrash size='1.25rem' />}
						onClick={() => handleOpenDeleteLessonModal(id)}
					>
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
					<Text size='md'>
						{isZeroTasks
							? `Brak zadań`
							: `${taskAmount} ${getTasksPlural(taskAmount)}`}
					</Text>
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
			<Button
				component={Link}
				to={`lesson-dashboard/${id}`}
				maw={200}
				my='lg'
				mx='auto'
			>
				Przejdź
			</Button>
		</Flex>
	);
}

export default LecturerLessonCard;
