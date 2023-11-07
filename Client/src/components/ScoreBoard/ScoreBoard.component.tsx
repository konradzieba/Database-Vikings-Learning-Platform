import { Table, Text, Group, ThemeIcon, rem, Stack, NumberFormatter } from '@mantine/core';
import { IconCoins, IconTrophy } from '@tabler/icons-react';

const data = [
	{
		studentName: 'Jan Kowalski',
		groupName: 'I ISI',
		score: 1600,
	},
	{
		studentName: 'Tomek Nowak',
		groupName: 'II IO',
		score: 1290,
	},
	{
		studentName: 'Daniel Danielowski',
		groupName: 'IV ISI',
		score: 1790,
	},
	{
		studentName: 'Roman Romanowski',
		groupName: 'IV ISI',
		score: 2050,
	},
	{
		studentName: 'Szymon Szymonowski',
		groupName: 'I ISI',
		score: 1890,
	},
	{
		studentName: 'Maciej Maciejowski',
		groupName: 'III ISI',
		score: 1530,
	},
];
// search for position of logged student
const loggedStudentPosition = 3;

const topColors = ['var(--score-color)', 'var(--mantine-color-gray-4)', '#9F563A'];

interface ScoreBoardProps {
	type: 'global' | 'local';
}

function ScoreBoard({ type }: ScoreBoardProps) {
	const isGlobal = type === 'global';
	const rows = data.map((row, index) => {
		const position = index + 1;
		const isTop3 = position < 4;
		return (
			<Table.Tr
				bg={position === loggedStudentPosition ? 'var(--mantine-primary-color)' : undefined}
				key={row.studentName}>
				<Table.Td>
					{isTop3 ? (
						<ThemeIcon variant='transparent' size='md' c={topColors[position - 1]} p={0} m={0}>
							<IconTrophy />
						</ThemeIcon>
					) : (
						<Text ml={rem(8)} size='md'>
							{position}
						</Text>
					)}
				</Table.Td>
				<Table.Td>{row.studentName}</Table.Td>
				{isGlobal && <Table.Td>{row.groupName}</Table.Td>}
				<Table.Td>
					<Group align='center' gap={rem(5)}>
						<ThemeIcon variant='transparent' size='sm' c='var(--score-color)'>
							<IconCoins />
						</ThemeIcon>
						<NumberFormatter value={row.score} thousandSeparator />
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

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
				<Text size={rem(24)} ta='center' c='var(--mantine-primary-color)' fw={700}>
					2
				</Text>
			</Stack>
		</Stack>
	);
}

export default ScoreBoard;
