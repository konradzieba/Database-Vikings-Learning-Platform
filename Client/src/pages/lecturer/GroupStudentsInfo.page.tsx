import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

function GroupStudentsInfoPage() {
	let { id } = useParams();
	const { groups } = useLecturerStore();
	const currentGroup = groups?.find(group => group.groupId === +id!);
	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(+id!);

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
					<Text>TEMPORARY TEXT WHEN THERE IS NO ELEMENT IN ARRAY</Text>
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
