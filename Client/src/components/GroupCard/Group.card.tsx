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

	const lessonsMultiple = (lessonsNumber: number) => {
		if (lessonsNumber === 1) {
			return 'lekcja';
		}
		if (lessonsNumber < 5 && lessonsNumber > 1) {
			return 'lekcje';
		} else {
			return 'lekcji';
		}
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
						component={Link}
						to={`../check-frequency`}
						leftSection={<IconPencil size='1.25rem' />}
					>
						Zmień nazwę
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item
						variant=''
						c='var(--bad-state-color)'
						leftSection={<IconTrash size='1.25rem' />}
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
							{lessonsMultiple(assignedLessons)}
						</Text>
					</Group>
				</Flex>
			</Button>
		</Flex>
	);
}

export default GroupCard;
