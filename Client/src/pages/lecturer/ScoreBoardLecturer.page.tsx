import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Loader, Select, Stack, Title } from '@mantine/core';

function ScoreBoardLecturerPage() {
	const { lecturerData } = useLecturerStore();
	const { data: groupsData } = useGetGroupsByLecturerId(lecturerData.lecturerId);

	if (groupsData?.groups.length === 0) {
		return (
			<Center h='25vh'>
				<Title>Nie posiadasz żadnych grup</Title>
			</Center>
		);
	}

	const selectLabels = groupsData?.groups?.map(group => group.groupName);

	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(groupsData?.groups[0].groupId!);

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	return (
		<Stack>
			<Select label='Grupa' mx='auto' data={selectLabels} />
		</Stack>
	);
}

export default ScoreBoardLecturerPage;
