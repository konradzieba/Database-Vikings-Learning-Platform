import { useCallback, useMemo } from 'react';
import {
	Table,
	Text,
	Group,
	ThemeIcon,
	rem,
	Stack,
	Popover,
	Button,
} from '@mantine/core';
import { IconCoins, IconTrophy } from '@tabler/icons-react';
import { Navigate, useParams } from 'react-router-dom';
import { TGetScoreBoard } from '@/types/ResponseTypes';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import HeartCounter from '../UI/HeartCounter';

const topColors = [
	'var(--score-color)',
	'var(--mantine-color-gray-4)',
	'#9F563A',
];

type TTableRow = {
	indexNumber: number;
	User: {
		firstName: string;
		lastName: string;
	};
	score: number;
	health: number;
	Group: {
		name: string;
		lecturerId?: number;
	};
};

interface ScoreBoardProps {
	type: 'global' | 'group' | 'my-groups';
	scoreBoardData?: TGetScoreBoard;
}

function ScoreBoardLecturer({ type, scoreBoardData }: ScoreBoardProps) {
	const { lecturerData } = useLecturerStore();
	const { id: groupId } = useParams<{ id: string }>();
	const isGlobal = type === 'global';
	const isMyGroups = type === 'my-groups';

	if (!groupId) return <Navigate to='/dashboard' />;

	const filteredByLecturerIdScoreBoardData = useMemo(
		() =>
			scoreBoardData?.scoreBoard.filter(
				(row) => row.Group.lecturerId === lecturerData?.lecturerId
			) || [],
		[scoreBoardData, lecturerData]
	);

	const filteredByGroupScoreBoardData = useMemo(
		() =>
			scoreBoardData?.scoreBoard.filter((row) => row.groupId === +groupId) ||
			[],
		[scoreBoardData, groupId]
	);

	const sortedRows = useMemo(() => {
		const dataToSort = isGlobal
			? scoreBoardData?.scoreBoard
			: isMyGroups
			? filteredByLecturerIdScoreBoardData
			: filteredByGroupScoreBoardData;

		return (
			dataToSort
				?.slice()
				.sort(
					(a, b) =>
						b.score - a.score || a.aggregatedSendTime - b.aggregatedSendTime
				) || []
		);
	}, [
		isGlobal,
		isMyGroups,
		scoreBoardData,
		filteredByLecturerIdScoreBoardData,
		filteredByGroupScoreBoardData,
	]);

	const renderTableRow = useCallback((row: TTableRow, index: number) => {
		const position = index + 1;
		const isTop3 = position < 4;

		return (
			<Table.Tr key={row.indexNumber}>
				<Table.Td>
					{isTop3 ? (
						<ThemeIcon
							variant='transparent'
							size='md'
							c={topColors[position - 1]}
							p={0}
							m={0}
						>
							<IconTrophy />
						</ThemeIcon>
					) : (
						<Text ml={rem(8)} size='md'>
							{position}
						</Text>
					)}
				</Table.Td>
				<Table.Td>{`${row.User.firstName} ${row.User.lastName}`}</Table.Td>
				<Table.Td>{row.indexNumber}</Table.Td>
				<Table.Td>
					<HeartCounter hearts={row.health} />
				</Table.Td>
				{isGlobal || (isMyGroups && <Table.Td>{row.Group.name}</Table.Td>)}
				<Table.Td>
					<Group align='center' gap={rem(5)}>
						<ThemeIcon variant='transparent' size='sm' c='var(--score-color)'>
							<IconCoins />
						</ThemeIcon>
						<Text size='sm'>{row.score}</Text>
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	}, []);

	const rows = sortedRows.map(renderTableRow);

	return (
		<Stack>
			<Table.ScrollContainer minWidth={700}>
				<Table verticalSpacing='xs'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Pozycja</Table.Th>
							<Table.Th>Student</Table.Th>
							<Table.Th>Numer indeksu</Table.Th>
							{isGlobal || (isMyGroups && <Table.Th>Grupa</Table.Th>)}
							<Table.Th>Życia</Table.Th>
							<Table.Th>Punkty</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Stack my='lg' gap={rem(5)}>
				<Popover width={320} position='bottom' withArrow shadow='md'>
					<Popover.Target>
						<Button
							mt='md'
							size='md'
							c='dimmed'
							variant='transparent'
							td='underline'
							style={{
								textUnderlineOffset: rem(5),
							}}
						>
							Kliknij tutaj, aby poznać szczegóły obliczania rankingu
						</Button>
					</Popover.Target>
					<Popover.Dropdown>
						<Text
							size='sm'
							style={{
								textWrap: 'balance',
							}}
						>
							Najważniejszym kryterium rankingu jest&nbsp;
							<Text span fw={500} c='var(--mantine-primary-color-lighter)'>
								ilość zdobytych punktów
							</Text>
							. W przypadku, gdy dwóch lub więcej studentów ma taką samą ilość
							punktów, to o kolejności decyduje{' '}
							<Text span fw={500} c='var(--mantine-primary-color-lighter)'>
								zsumowany czas wysłania wszystkich odpowiedzi
							</Text>
							.
						</Text>
					</Popover.Dropdown>
				</Popover>
			</Stack>
		</Stack>
	);
}

export default ScoreBoardLecturer;
