import CorrectFrequencyList from '@/components/FrequencyList/CorrectFrequencyList.component';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useGetAbsentStudentsQuery } from '@/hooks/lessons/useGetAbsentStudentsQuery';
import { Button, Center, Group, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import FullScreenLoader from '@/components/UI/FullScreenLoader';

function CheckFrequencyPage() {
	const { id: groupId, lessonId } = useParams();
	const { data: StudentsFromGroup, isLoading: isStudentsFromGroupDataLoading } = useGetStudentsFromGroup(+groupId!);
	const { data: AbsentStudents, isLoading: isAbsentStudentsDataLoading } = useGetAbsentStudentsQuery(+lessonId!);

	useMemo(() => {
		if (StudentsFromGroup?.students) {
			StudentsFromGroup.students.sort((a, b) => {
				return a.lastName.localeCompare(b.lastName);
			});
		}
	}, [StudentsFromGroup]);

	return (
		<>
			{isAbsentStudentsDataLoading && isStudentsFromGroupDataLoading ? (
				<FullScreenLoader />
			) : (
				<Center>
					<Stack w='50%'>
						<Stack align='center'>
							<Title>Obecność</Title>
							<Title order={2}>Lekcja&nbsp;{AbsentStudents?.number}</Title>
						</Stack>

						<CorrectFrequencyList
							isFrequencyChecked={AbsentStudents?.isFrequencyChecked!}
							studentsFromGroup={StudentsFromGroup?.students!}
							absentStudentsList={AbsentStudents?.absentStudents!}
						/>
					</Stack>
				</Center>
			)}
		</>
	);
}

export default CheckFrequencyPage;
