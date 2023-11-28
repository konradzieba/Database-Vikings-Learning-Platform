import { Button, Checkbox, Group, Stack, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { useState } from 'react';
import cx from 'clsx';
import classes from './FrequencyList.component.module.css';
import { IconCoins } from '@tabler/icons-react';
import FullScreenLoader from '../UI/FullScreenLoader';

interface CorrectFrequencyListProps {
	studentsFromGroup: {
		id: number;
		firstName: string;
		lastName: string;
		indexNumber: number;
		score: number;
		health: number;
		groupId: number;
		lastLogin: string;
		userId: number;
	}[];
	absentStudentsList: number[];
	isFrequencyChecked: boolean;
}

function CorrectFrequencyList({
	studentsFromGroup,
	absentStudentsList,
	isFrequencyChecked,
}: CorrectFrequencyListProps) {
	if (!studentsFromGroup) {
		return <FullScreenLoader />;
	}

	const [selection, setSelection] = useState<number[]>(absentStudentsList || []);
	const toggleRow = (id: number) => {
		setSelection(current => (current.includes(id) ? current.filter(item => item !== id) : [...(current || []), id]));
	};

	const rows = studentsFromGroup.map(item => {
		const selected = selection.includes(item.id) || false;
		const hasZeroLives = item.health === 0;
		return (
			<Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
				<Table.Td>
					<Group gap='sm'>
						<Text size='sm' fw={500}>
							{item.firstName}&nbsp;{item.lastName}
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
				<Table.Td lts={rem(2)} c={hasZeroLives ? 'var(--bad-state-color)' : undefined}>
					<Text size='sm' fw={500}>{`${item.health}/3`}</Text>
				</Table.Td>
				<Table.Td>
					<Checkbox
						checked={selected}
						onChange={() => {
							toggleRow(item.id);
							// toggleCredentials(`${item.firstName} ${item.lastName}`);
						}}
					/>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Stack gap='xl'>
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

			<Button mx='auto' miw={150} onClick={() => console.log(selection)}>
				{isFrequencyChecked ? 'Skoryguj' : 'Sprawdź'}
			</Button>
		</Stack>
	);
}
export default CorrectFrequencyList;
