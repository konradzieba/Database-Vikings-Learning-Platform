import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import DataNotFound from '@/components/UI/DataNotFound';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function GroupStudentsInfoPage() {
	let { id } = useParams();
	const { groups } = useLecturerStore();
	const currentGroup = groups?.find(group => group.groupId === +id!);
	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(+id!);

	useMemo(() => {
		if (StudentsFromGroup?.students) {
			StudentsFromGroup.students.sort((a, b) => {
				return a.lastName.localeCompare(b.lastName);
			});
		}
	}, [StudentsFromGroup]);

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	return (
		<>
			<Flex direction='column' align='center' justify='center' gap='md'>
				{StudentsFromGroup?.students.length === 0 ? (
					<DataNotFound />
				) : (
					StudentsFromGroup?.students.map(data => (
						<StudentInfoCard
							key={`${data.indexNumber}`}
							userId={data.userId}
							studentId={data.id}
							firstName={data.firstName}
							lastName={data.lastName}
							index={data.indexNumber}
							score={data.score}
							hearts={data.health}
							lastLoggedIn={data.lastLogin}
							currentGroup={currentGroup?.groupName!}
						/>
					))
				)}
			</Flex>
		</>
	);
}

export default GroupStudentsInfoPage;
