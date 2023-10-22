import AddGroupCard from '@/components/GroupCard/AddGroup.card';
import GroupCard from '@/components/GroupCard/Group.card';
import { Center, Flex } from '@mantine/core';

const mockData = [
	{
		groupName: 'Grupa - ISI - 4',
		assignedStudents: 20,
		assignedLessons: 6,
	},
	{
		groupName: 'Grupa - ISI - 3',
		assignedStudents: 4,
		assignedLessons: 2,
	},
];

function DashboardPage() {
	return (
		//to consider if leave center of flex, now added to check positioning
		<Center>
			<Flex gap='sm' wrap='wrap'>
				<GroupCard
					groupName={mockData[0].groupName!}
					assignedLessons={mockData[0].assignedLessons!}
					assignedStudents={mockData[0].assignedStudents!}
				/>
				<GroupCard
					groupName={mockData[1].groupName!}
					assignedLessons={mockData[1].assignedLessons!}
					assignedStudents={mockData[1].assignedStudents!}
				/>
				<AddGroupCard />
			</Flex>
		</Center>
	);
}

export default DashboardPage;
