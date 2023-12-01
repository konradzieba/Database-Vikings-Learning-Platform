import { useCorrectLessonFrequencyMutation } from '@/hooks/lessons/useCorrectLessonFrequencyMutation';
import { Badge, Button, Center, Divider, Group, Loader, Stack, Text, rem } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconArrowNarrowRight, IconCircleCheck, IconCircleX } from '@tabler/icons-react';

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
	const {
		mutate: correctLessonFrequency,
		isPending,
		isSuccess,
		isError,
	} = useCorrectLessonFrequencyMutation(innerProps.lessonId, innerProps.newStudentListIds);


	function areArraysEqual(arr1: number[], arr2: number[]): boolean {
		return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
	}
	
	const areEqual = areArraysEqual(innerProps.oldStudentListIds, innerProps.newStudentListIds);

	const handleCorrectFrequency = () => {
		correctLessonFrequency();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center mih={rem(200)}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<Stack mx='md' align='center'>
				<IconCircleCheck size='3rem' color='var(--good-state-color)' />
				<Text>Lista obecności została zaktualizowana pomyślnie.</Text>
				<Button miw={150} mx='auto' onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack mx='md' align='center'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>Wystąpił problem podczas aktualizowania listy obecności.</Text>
				<Button miw={150} mx='auto' onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</Stack>
		);
	}

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
					<Text c={!areEqual ? '' : 'dimmed'} fs={!areEqual ? '' : 'italic'} ta={!areEqual ? 'left' : 'center'}>
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
						fs={innerProps.newStudentListIds.length === 0 ? 'italic' : ''}
						ta={innerProps.newStudentListIds.length === 0 ? 'center' : 'left'}>
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
