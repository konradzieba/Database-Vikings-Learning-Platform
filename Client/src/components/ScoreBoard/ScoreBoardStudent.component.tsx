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
import { useCallback, useMemo } from 'react';

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
	Group: {
		name: string;
	};
};

type TScoreBoardData =
	| {
			scoreBoard: {
				id: number;
				indexNumber: number;
				score: number;
				groupId: number;
				aggregatedSendTime: number;
				Group: {
					name: string;
				};
				User: {
					firstName: string;
					lastName: string;
				};
			}[];
			message: string;
	  }
	| undefined;

interface ScoreBoardProps {
	type: 'global' | 'local';
	scoreBoardData?: TScoreBoardData;
	studentInfo: {
		studentId: number | null;
		groupId: number | null;
	};
}

function ScoreBoardStudent({
	type,
	studentInfo,
	scoreBoardData,
}: ScoreBoardProps) {
	const { groupId, studentId } = studentInfo;
	const isGlobal = type === 'global';

	const filteredByGroupScoreBoardData = scoreBoardData?.scoreBoard.filter(
		(row) => row.groupId === groupId
	);

	const sortedRows = useMemo(() => {
		return (
			(isGlobal
				? scoreBoardData?.scoreBoard
						.slice()
						.sort(
							(a, b) =>
								b.score - a.score || a.aggregatedSendTime - b.aggregatedSendTime
						)
				: filteredByGroupScoreBoardData
						?.slice()
						.sort(
							(a, b) =>
								b.score - a.score || a.aggregatedSendTime - b.aggregatedSendTime
						)) || []
		);
	}, [isGlobal, scoreBoardData, filteredByGroupScoreBoardData]);

	const studentPositionIdx = sortedRows.findIndex(
		(row) => row.id === studentId
	);

	const studentPosition =
		studentPositionIdx != null ? studentPositionIdx + 1 : -1;

	const renderTableRow = useCallback(
		(row: TTableRow, index: number) => {
			const position = index + 1;
			const isTop3 = position < 4;
			const background =
				position === studentPosition
					? 'var(--mantine-primary-color)'
					: undefined;

			return (
				<Table.Tr key={row.indexNumber} bg={background}>
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
					{isGlobal && <Table.Td>{row.Group.name}</Table.Td>}
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
		},
		[scoreBoardData?.scoreBoard, studentPosition]
	);

	const rows = sortedRows.map(renderTableRow);

	return (
		<Stack>
			<Table.ScrollContainer minWidth={700}>
				<Table verticalSpacing='xs'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Pozycja</Table.Th>
							<Table.Th>Student</Table.Th>
							{isGlobal && <Table.Th>Grupa</Table.Th>}
							<Table.Th>Punkty</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Stack my='lg' gap={rem(5)}>
				<Text ta='center' size='md' fw={500}>
					Twoja pozycja w rankingu {isGlobal ? 'całego roku' : 'grupy'}:
				</Text>

				<Text
					size={rem(24)}
					ta='center'
					c='var(--mantine-primary-color)'
					fw={700}
				>
					{studentPosition === -1 ? 'Brak' : studentPosition}
				</Text>

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

export default ScoreBoardStudent;
