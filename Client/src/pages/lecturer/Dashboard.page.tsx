import AddGroupCard from '@/components/GroupCard/AddGroup.card';
import GroupCard from '@/components/GroupCard/Group.card';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader } from '@mantine/core';
import { useMemo } from 'react';

function DashboardPage() {
	const { lecturerData } = useLecturerStore();

	const { data: groupsData, isPending } = useGetGroupsByLecturerId(
		lecturerData.lecturerId
	);

	const sortedGroups = useMemo(() => {
		if (groupsData?.groups) {
			return groupsData.groups.sort((a, b) => a.groupId - b.groupId);
		}
	}, [groupsData]);

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
					{sortedGroups?.map((group) => (
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
