import CorrectFrequencyList from '@/components/FrequencyList/CorrectFrequencyList.component';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useGetAbsentStudentsQuery } from '@/hooks/lessons/useGetAbsentStudentsQuery';
import { Button, Center, Group, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import FullScreenLoader from '@/components/UI/FullScreenLoader';

function CheckFrequencyPage() {
	const { id: groupId, lessonId } = useParams();
	const { data: StudentsFromGroup } = useGetStudentsFromGroup(+groupId!);
	const { data: AbsentStudents } = useGetAbsentStudentsQuery(+lessonId!);

	useMemo(() => {
		if (StudentsFromGroup?.students) {
			StudentsFromGroup.students.sort((a, b) => {
				return a.lastName.localeCompare(b.lastName);
			});
		}
	}, [StudentsFromGroup]);

	const handleCheckFrequency = () => {
		console.log('Sprawdzenie obecności bez generowania pdf');
	};

	const handleCheckFrequencyAndGeneratePDF = () => {
		console.log('Sprawdzenie obecności i wygenerowanie PDF');
	};

	return (
		<>
			{!AbsentStudents ? (
				<FullScreenLoader />
			) : (
				<Center>
					<Stack w='50%'>
						<Stack align='center'>
							<Title>Obecność</Title>
							<Title order={2}>Lekcja&nbsp;{AbsentStudents?.number}</Title>
						</Stack>

						<CorrectFrequencyList
							studentsFromGroup={StudentsFromGroup?.students!}
							absentStudentsList={AbsentStudents?.absentStudents!}
						/>

						<Group justify='center'>
							<Button variant='outline' onClick={handleCheckFrequencyAndGeneratePDF}>
								Potwierdź zmiany i wygeneruj PDF
							</Button>
							<Button onClick={handleCheckFrequency}>Potwierdź zmiany</Button>
						</Group>
					</Stack>
				</Center>
			)}
		</>
	);
}

export default CheckFrequencyPage;
