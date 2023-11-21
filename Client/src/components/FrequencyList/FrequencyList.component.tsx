import cx from 'clsx';
import { useEffect, useState } from 'react';
import { Table, Checkbox, Group, Text, rem, ThemeIcon, Flex } from '@mantine/core';
import classes from './FrequencyList.component.module.css';
import { IconCoins } from '@tabler/icons-react';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useParams } from 'react-router-dom';
import FullScreenLoader from '../UI/FullScreenLoader';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

// REMINDER: DATA WILL BE SORTED, LAST NAME WILL BE BEFORE FIRST NAME, ARRAY WILL BE SORTED BY LASTNAME

function FrequencyList() {
	const { id: groupId } = useParams();
	const { data: StudentsFromGroup, isLoading } = useGetStudentsFromGroup(+groupId!);
	const { createdLessonsArray, updateLesson } = useCreateLessonStore();
	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +groupId!);
	const [selection, setSelection] = useState<number[] | null>(lessonFromGroup?.absentStudents || null);
	const toggleRow = (id: number) => {
		setSelection(current => (current?.includes(id) ? current.filter(item => item !== id) : [...(current || []), id]));
	};

	useEffect(() => {
		if (lessonFromGroup && selection) {
			const updatedLessonFromGroup = {
				...lessonFromGroup,
				absentStudents: selection,
				isFrequencyChecked: true,
			};
			updateLesson(+groupId!, updatedLessonFromGroup);
		}
	}, [selection]);

	const rows = StudentsFromGroup?.students.map(item => {
		const selected = selection?.includes(item.id) || false;
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
					<Checkbox checked={selected} onChange={() => toggleRow(item.id)} />
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<>
			{isLoading ? (
				<Flex w='100%' justify='center'>
					<FullScreenLoader />
				</Flex>
			) : (
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
			)}
		</>
	);
}

export default FrequencyList;
