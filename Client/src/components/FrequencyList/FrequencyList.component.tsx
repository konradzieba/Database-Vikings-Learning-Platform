import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Text, rem, ThemeIcon, BoxProps } from '@mantine/core';
import classes from './FrequencyList.component.module.css';
import { IconCoins } from '@tabler/icons-react';

// REMINDER: DATA WILL BE SORTED, LAST NAME WILL BE BEFORE FIRST NAME, ARRAY WILL BE SORTED BY LASTNAME
const data = [
	{
		id: 1,
		studentName: 'Robert Wolfkisser',
		score: 100,
		lifes: 3,
	},
	{
		id: 2,
		studentName: 'Jill Jailbreaker',
		score: 120,
		lifes: 2,
	},
	{
		id: 3,
		studentName: 'Henry Silkeater',
		score: 130,
		lifes: 3,
	},
	{
		id: 4,
		studentName: 'Bill Horsefighter',
		score: 140,
		lifes: 1,
	},
	{
		id: 5,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 6,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 7,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 8,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 9,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 10,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 11,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
	{
		id: 12,
		studentName: 'Jeremy Footviewer',
		score: 150,
		lifes: 2,
	},
];

interface FrequencyListProps extends BoxProps {}

function FrequencyList({ ...BoxProps }: FrequencyListProps) {
	const [selection, setSelection] = useState<number[] | null>(null);
	const toggleRow = (id: number) => {
		setSelection(current => (current?.includes(id) ? current.filter(item => item !== id) : [...(current || []), id]));
	};

	const rows = data.map(item => {
		const selected = selection?.includes(item.id) || false;
		const hasZeroLifes = item.lifes === 0;
		return (
			<Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
				<Table.Td>
					<Group gap='sm'>
						<Text size='sm' fw={500}>
							{item.studentName}
						</Text>
					</Group>
				</Table.Td>
				<Table.Td>
					<Group align='center' gap={rem(5)}>
						<ThemeIcon size='sm' variant='transparent' c='var(--score-color)'>
							<IconCoins />
						</ThemeIcon>
						<Text size='sm' fw={500}>
							{item.score}
						</Text>
					</Group>
				</Table.Td>
				<Table.Td lts={rem(2)} c={hasZeroLifes ? 'var(--bad-state-color)' : undefined}>
					<Text size='sm' fw={500}>{`${item.lifes}/3`}</Text>
				</Table.Td>
				<Table.Td>
					<Checkbox checked={selected} onChange={() => toggleRow(item.id)} />
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<ScrollArea offsetScrollbars='y' {...BoxProps}>
			<Table verticalSpacing='sm'>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Imię i nazwisko</Table.Th>
						<Table.Th>Wynik</Table.Th>
						<Table.Th>Życia</Table.Th>
						<Table.Th>Nieobecność</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</ScrollArea>
	);
}

export default FrequencyList;
