import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useLecturerStore } from '@/utils/store';
import { Flex, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';

function GroupStudentsInfoPage() {
	let { id } = useParams();
	const { groups } = useLecturerStore();
	const currentGroup = groups?.find(group => group.groupId === +id!);
	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(+id!);
	return (
		<>
			{isPending ? (
				<FullScreenLoader />
			) : (
				<Flex direction='column' align='center' justify='center' gap='md'>
					{StudentsFromGroup?.students.length === 0 ? (
						<Text>TEMPORARY TEXT WHEN THERE IS NO ELEMENT IN ARRAY</Text>
					) : (
						StudentsFromGroup?.students.map(data => (
							<StudentInfoCard
								key={`${data.indexNumber}`}
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
			)}
		</>
	);
}

export default GroupStudentsInfoPage;
