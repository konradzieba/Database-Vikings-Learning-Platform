import { Button, Flex, Group, Menu, Text, rem } from '@mantine/core';
import classes from './StudentInfo.card.module.css';
import HeartCounter from '../UI/HeartCounter';
import DateTimeDisplay from '../UI/DateTimeDisplay';
import {
	IconClock,
	IconCoins,
	IconDots,
	IconReplace,
	IconUserEdit,
	IconUserMinus,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';

interface StudentInfoCardProps {
	userId: number;
	studentId: number;
	firstName: string;
	lastName: string;
	index: number;
	score: number;
	hearts: number;
	lastLoggedIn: string;
	currentGroup: string;
}

function StudentInfoCard({
	studentId,
	userId,
	firstName,
	lastName,
	index,
	score,
	hearts,
	lastLoggedIn,
	currentGroup,
}: StudentInfoCardProps) {
	const { id: groupId } = useParams();
	const { refetch } = useGetStudentsFromGroup(+groupId!);
	const handleOpenGroupChangeModal = () => {
		modals.openContextModal({
			modal: 'changeStudentGroup',
			title: 'Zmień grupę studenta',
			size: 'md',
			closeOnClickOutside: false,
			onClose: () => refetch(),
			innerProps: {
				studentId,
				groupId: +groupId!,
				fullName: `${firstName} ${lastName}`,
				modalBody: `${currentGroup}`,
			},
		});
	};

	const handleOpenEditStudentModal = () => {
		modals.openContextModal({
			modal: 'editStudentInfo',
			title: 'Edytuj informacje',
			size: 'md',
			closeOnClickOutside: false,
			closeOnEscape: false,
			onClose: () => refetch(),
			innerProps: {
				studentId,
				firstName,
				lastName,
				indexNumber: +index,
				score: +score,
				health: +hearts,
				modalBody: '',
			},
		});
	};

	const handleOpenDeleteStudentModal = () => {
		modals.openContextModal({
			modal: 'deleteStudent',
			title: 'Usuń studenta',
			size: 'md',
			closeOnClickOutside: false,
			closeOnEscape: false,
			withCloseButton: false,
			onClose: () => refetch(),
			innerProps: {
				fullName: `${firstName} ${lastName}`,
				userId: userId,
				modalBody: `Czy na pewno chcesz usunąć studenta, ${firstName} ${lastName}?`,
			},
		});
	};

	return (
		<Flex
			align='center'
			justify='space-between'
			px='sm'
			py='sm'
			miw='50%'
			className={classes.studentInfoCardContainer}
		>
			<Flex direction='column' align='center' miw='25%'>
				<Text>{`${firstName} ${lastName}`}</Text>
				<Text fw={500} size='lg' py={rem(4)}>
					{index}
				</Text>
			</Flex>
			<Flex direction='column' align='center' miw='10%'>
				<Text>Punkty</Text>
				<Group className={classes.score} gap={rem(2)} py={rem(4.2)}>
					<IconCoins />
					<Text size='lg' fw={500}>
						{score}
					</Text>
				</Group>
			</Flex>
			<Flex direction='column' align='center' gap={0}>
				<Text>Życia</Text>
				<HeartCounter hearts={hearts} />
			</Flex>
			<Flex direction='column'>
				<DateTimeDisplay
					date={lastLoggedIn}
					title='Ostatnie logowanie'
					icon={<IconClock size='1.3rem' />}
				/>
			</Flex>
			<Menu width={200} withArrow shadow='md'>
				<Menu.Target>
					<Button variant='transparent' c='dimmed'>
						<IconDots />
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>Grupa</Menu.Label>
					<Menu.Item
						leftSection={<IconReplace size='1.3rem' />}
						onClick={handleOpenGroupChangeModal}
					>
						Przenieś
					</Menu.Item>
					<Menu.Label>Student</Menu.Label>
					<Menu.Item
						leftSection={<IconUserEdit size='1.3rem' />}
						onClick={handleOpenEditStudentModal}
					>
						Edytuj
					</Menu.Item>
					<Menu.Item
						color='red.8'
						leftSection={<IconUserMinus size='1.3rem' />}
						onClick={handleOpenDeleteStudentModal}
					>
						Usuń
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Flex>
	);
}

export default StudentInfoCard;
