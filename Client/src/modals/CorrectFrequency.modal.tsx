import { Badge, Box, Button, Divider, Group, Stack, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconArrowNarrowRight } from '@tabler/icons-react';

interface CorrectFrequencyListProps {
	modalBody: string;
	lessonId: number;
	newStudentListIds: number[];
	oldStudentListIds: number[];
	isFrequencyChecked: boolean;
	selectedStudentCredentials: {
		id: number;
		name: string;
	}[];
}

function CorrectFrequencyModal({ innerProps, context, id }: ContextModalProps<CorrectFrequencyListProps>) {
	const handleCorrectFrequency = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};
	function areArraysEqual(arr1: number[], arr2: number[]): boolean {
		return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
	}
	const areEqual = areArraysEqual(innerProps.oldStudentListIds, innerProps.newStudentListIds);
	return (
		<>
			{innerProps.isFrequencyChecked ? (
				<Stack mx='md'>
					<Text>
						Po zatwierdzeniu lista nieobecnych studentów w tej lekcji zostanie skorygowana. Niżej wymienionym studentom
						zmieni się status obecności. Ci których status z nieobecnych zamieniono na obecny odzyskają utracone życie.
						Również działa to drugą stroną jeśli zmienimy status z obecnego na nieobecnego.
					</Text>
					<Divider />
					<Text c={!areEqual ? '' : 'dimmed'} fs={!areEqual ? '' : 'italic'}>
						{!areEqual ? 'Zmienione statusy' : 'Nie wprowadzono zmian'}
					</Text>
					{innerProps.selectedStudentCredentials.map(student => {
						const isInOldStudents = innerProps.oldStudentListIds.includes(student.id);
						const isInNewStudents = innerProps.newStudentListIds.includes(student.id);
						if (isInNewStudents && isInOldStudents) {
							return;
						}
						if (!isInNewStudents && !isInOldStudents) {
							return null;
						}
						return (
							<Group key={student.id} justify='space-between'>
								<Text>{student.name}</Text>
								<Group>
									<Text
										fw={500}
										c={isInOldStudents ? 'var(--bad-state-color)' : 'var(--mantine-primary-color-lighter)'}>
										{isInOldStudents ? 'Nieobecny' : 'Obecny'}
									</Text>
									<IconArrowNarrowRight />
									<Text
										fw={500}
										c={isInNewStudents ? 'var(--bad-state-color)' : 'var(--mantine-primary-color-lighter)'}>
										{isInNewStudents ? 'Nieobecny' : 'Obecny'}
									</Text>
								</Group>
							</Group>
						);
					})}
				</Stack>
			) : (
				<Stack mx='md'>
					<Text>
						Po zatwierdzeniu zostanie zaktualizowana lista nieobecnych studentów w tej lekcji. Spowoduje to że każdy z
						niżej wymienionych studentów straci po jednym życiu.
					</Text>
					<Divider />
					<Text
						c={innerProps.newStudentListIds.length === 0 ? 'dimmed' : ''}
						fs={innerProps.newStudentListIds.length === 0 ? 'italic' : ''}>
						{innerProps.newStudentListIds.length > 0 ? 'Nieobecni studenci' : 'Brak nieobecnych studentów'}
					</Text>
					<Group>
						{innerProps.selectedStudentCredentials.map(student => {
							if (!innerProps.newStudentListIds.includes(student.id)) {
								return;
							} else {
								return (
									<Badge color='gray' size='lg' key={student.id}>
										{student.name}
									</Badge>
								);
							}
						})}
					</Group>
				</Stack>
			)}

			<Group justify='center' mt='md'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleCorrectFrequency}>
					Potwierdź
				</Button>
			</Group>
		</>
	);
}

export default CorrectFrequencyModal;
