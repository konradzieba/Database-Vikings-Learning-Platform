import AddGroupCard from '@/components/GroupCard/AddGroup.card';
import GroupCard from '@/components/GroupCard/Group.card';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader } from '@mantine/core';

function DashboardPage() {
	const { lecturerData } = useLecturerStore();

	const { data: groupsData, isPending } = useGetGroupsByLecturerId(lecturerData.lecturerId);

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	return (
		<>
			<Center>
				<Flex gap='sm' wrap='wrap'>
					{groupsData?.groups?.map(group => (
						<GroupCard
							key={group.groupId}
							groupId={group.groupId}
							groupName={group.groupName}
							assignedLessons={group.lessonsCount}
							assignedStudents={group.studentsCount}
						/>
					))}
					<AddGroupCard />
				</Flex>
			</Center>
		</>
	);
}

export default DashboardPage;
