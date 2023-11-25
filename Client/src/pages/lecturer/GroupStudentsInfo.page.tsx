import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import DataNotFound from '@/components/UI/DataNotFound';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader } from '@mantine/core';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function GroupStudentsInfoPage() {
	let { id } = useParams();
	const { lecturerData } = useLecturerStore();
	const { data: groupsData, isPending: isGetGroupsDataPending } = useGetGroupsByLecturerId(lecturerData.lecturerId);
	const { data: StudentsFromGroup, isPending: isGetStudentsFromGroupPending } = useGetStudentsFromGroup(+id!);

	useMemo(() => {
		if (StudentsFromGroup?.students) {
			StudentsFromGroup.students.sort((a, b) => {
				return a.lastName.localeCompare(b.lastName);
			});
		}
	}, [StudentsFromGroup]);

	if (isGetGroupsDataPending || isGetStudentsFromGroupPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	const currentGroup = groupsData?.groups.find(group => group.groupId === +id!);

	return (
		<>
			<Flex direction='column' align='center' justify='center' gap='md'>
				{StudentsFromGroup?.students.length === 0 ? (
					<DataNotFound firstLineText='Lista studentów' secondLineText='jest pusta' />
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
							groups={groupsData?.groups!}
						/>
					))
				)}
			</Flex>
		</>
	);
}

export default GroupStudentsInfoPage;
