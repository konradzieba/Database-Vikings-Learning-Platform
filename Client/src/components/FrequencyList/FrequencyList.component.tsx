import cx from 'clsx';
import { SetStateAction, Dispatch } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Table, Checkbox, Group, Text, rem, ThemeIcon, Flex } from '@mantine/core';
import classes from './FrequencyList.component.module.css';
import { IconCoins } from '@tabler/icons-react';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useParams } from 'react-router-dom';
import FullScreenLoader from '../UI/FullScreenLoader';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

interface FrequencyListProps {
	setFrequencyListPDF: Dispatch<
		SetStateAction<
			| {
					newStudentIds: number[] | null;
					studentsFromGroup:
						| {
								id: number;
								firstName: string;
								lastName: string;
								indexNumber: number;
								score: number;
								health: number;
								groupId: number;
								lastLogin: string;
								userId: number;
						  }[]
						| null;
			  }
			| undefined
		>
	>;
}

function FrequencyList({ setFrequencyListPDF }: FrequencyListProps) {
	const { id: groupId } = useParams();
	const { data: StudentsFromGroup, isLoading, isSuccess } = useGetStudentsFromGroup(+groupId!);

	useMemo(() => {
		if (StudentsFromGroup?.students) {
			StudentsFromGroup.students.sort((a, b) => {
				if (a.lastName === b.lastName) {
					return a.firstName.localeCompare(b.firstName);
				} else {
					return a.lastName.localeCompare(b.lastName);
				}
			});
		}
	}, [StudentsFromGroup]);

	const { createdLessonsArray, updateLesson } = useCreateLessonStore();
	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +groupId!);
	const [selection, setSelection] = useState<number[] | null>(lessonFromGroup?.absentStudents || null);
	const [selectedStudentCredentials, setSelectedStudentCredentials] = useState<string[] | null>(
		lessonFromGroup?.absentStudentsCredentials || null
	);

	const toggleRow = (id: number) => {
		setSelection(current => (current?.includes(id) ? current.filter(item => item !== id) : [...(current || []), id]));
	};

	const toggleCredentials = (credentials: string) => {
		setSelectedStudentCredentials(current =>
			current?.includes(credentials) ? current.filter(item => item !== credentials) : [...(current || []), credentials]
		);
	};

	useEffect(() => {
		if (isSuccess) {
			setFrequencyListPDF({
				newStudentIds: selection,
				studentsFromGroup: StudentsFromGroup.students!,
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (lessonFromGroup && selection && selectedStudentCredentials) {
			const updatedLessonFromGroup = {
				...lessonFromGroup,
				absentStudents: selection,
				absentStudentsCredentials: selectedStudentCredentials,
				isFrequencyChecked: true,
			};
			updateLesson(+groupId!, updatedLessonFromGroup);
			setFrequencyListPDF({
				newStudentIds: selection,
				studentsFromGroup: StudentsFromGroup?.students!,
			});
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
					<Checkbox
						checked={selected}
						onChange={() => {
							toggleRow(item.id);
							toggleCredentials(`${item.firstName} ${item.lastName}`);
						}}
					/>
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
