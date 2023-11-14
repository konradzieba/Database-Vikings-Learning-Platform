import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import { useLecturerStore } from '@/utils/store';
import { Center, Loader, Select, Stack, Title } from '@mantine/core';

function ScoreBoardLecturerPage() {
	const { groups } = useLecturerStore();
	console.log(groups);

	if (groups?.length === 0) {
		return (
			<Center h='25vh'>
				<Title>Nie posiadasz żadnych grup</Title>
			</Center>
		);
	}

	const selectLabels = groups?.map((group) => group.groupName);

	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(
		groups![0].groupId
	);

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
