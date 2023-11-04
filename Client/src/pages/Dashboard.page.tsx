import AddGroupCard from '@/components/GroupCard/AddGroup.card';
import GroupCard from '@/components/GroupCard/Group.card';
import { useLecturerStore } from '@/utils/store';
import { Center, Flex, Loader } from '@mantine/core';

function DashboardPage() {
	const { groups } = useLecturerStore();

	return (
		<>
			{groups?.length ? (
				<Center>
					<Flex gap='sm' wrap='wrap'>
						{groups?.map((group) => (
							<GroupCard
								key={group.groupId}
								groupName={group.groupName}
								assignedLessons={group.lessonsCount}
								assignedStudents={group.studentsCount}
							/>
						))}
						<AddGroupCard />
					</Flex>
				</Center>
			) : (
				<Center h='25vh'>
					<Loader />
				</Center>
			)}
		</>
	);
}

export default DashboardPage;
