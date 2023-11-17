import AddGroupCard from '@/components/GroupCard/AddGroup.card';
import GroupCard from '@/components/GroupCard/Group.card';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Flex, Loader } from '@mantine/core';

function DashboardPage() {
	const { groups } = useLecturerStore();

	if (!groups?.length) {
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
					{groups?.map(group => (
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
