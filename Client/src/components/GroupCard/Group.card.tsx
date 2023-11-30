import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Menu,
	Text,
	ThemeIcon,
} from '@mantine/core';
import {
	IconDots,
	IconListTree,
	IconPencil,
	IconTrash,
	IconUsers,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Group.card.module.css';
import clsx from 'clsx';
import { openContextModal } from '@mantine/modals';

export const getLessonPlural = (lessonsNumber: number) => {
	if (lessonsNumber === 1) {
		return 'lekcja';
	}
	if (lessonsNumber < 5 && lessonsNumber > 1) {
		return 'lekcje';
	} else {
		return 'lekcji';
	}
};

interface GroupCardProps {
	groupId: number;
	groupName: string;
	assignedStudents: number;
	assignedLessons: number;
}

function GroupCard({
	groupId,
	groupName,
	assignedStudents,
	assignedLessons,
}: GroupCardProps) {
	const studentsMultiple = (studentsNumber: number) => {
		if (studentsNumber === 1) {
			return 'student';
		} else {
			return 'studentów';
		}
	};

	const handleOpenRenameGroupModal = () => {
		openContextModal({
			modal: 'renameGroup',
			title: 'Zmiana nazwy grupy',
			size: 'lg',
			innerProps: {
				groupName,
				groupId,
			},
		});
	};

	const handleOpenDeleteGroupModal = () => {
		openContextModal({
			modal: 'deleteGroup',
			title: 'Usuwanie grupy',
			size: 'lg',
			innerProps: {
				groupName,
				groupId,
			},
		});
	};

	return (
		<Flex
			direction='column'
			pt='md'
			className={clsx(classes.groupCardWrapper, classes.cardLink)}
		>
			<Box component={Menu} mr='sm' className={classes.menuWrapper}>
				<Menu.Target>
					<ActionIcon variant='transparent' c='var(--mantine-primary-color)'>
						<IconDots />
					</ActionIcon>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						leftSection={<IconPencil size='1.25rem' />}
						onClick={handleOpenRenameGroupModal}
					>
						Zmień nazwę
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item
						variant=''
						c='var(--bad-state-color)'
						leftSection={<IconTrash size='1.25rem' />}
						onClick={handleOpenDeleteGroupModal}
					>
						Usuń grupę
					</Menu.Item>
				</Menu.Dropdown>
			</Box>
			<Text px='md' fz='md' fw={500}>
				{groupName}
			</Text>
			<Divider mt='sm' size='xs' color='var(--mantine-primary-color)' />
			<Button
				unstyled
				h='100%'
				px='md'
				py='xs'
				component={Link}
				to={`/dashboard/group/${groupId}`}
				className={classes.cardLink}
			>
				<Flex direction='column'>
					<Group>
						<ThemeIcon variant='transparent' c='var(--mantine-primary-color)'>
							<IconUsers />
						</ThemeIcon>
						<Text span>
							<Text span fw={500}>
								{assignedStudents}&nbsp;
							</Text>
							{studentsMultiple(assignedStudents)}
						</Text>
					</Group>
					<Group>
						<ThemeIcon variant='transparent' c='var(--mantine-primary-color)'>
							<IconListTree />
						</ThemeIcon>
						<Text>
							<Text span fw={500}>
								{assignedLessons}&nbsp;
							</Text>
							{getLessonPlural(assignedLessons)}
						</Text>
					</Group>
				</Flex>
			</Button>
		</Flex>
	);
}

export default GroupCard;
