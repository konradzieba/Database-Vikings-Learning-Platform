import ScoreBoardLecturer from '@/components/ScoreBoard/ScoreBoardLecturer.component';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import useGetScoreBoardQuery from '@/hooks/users/useGetScoreBoardQuery';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Center, Loader, Select, Stack, Title } from '@mantine/core';

function ScoreBoardLecturerPage() {
	const { lecturerData } = useLecturerStore();
	const { data: groupsData } = useGetGroupsByLecturerId(
		lecturerData.lecturerId
	);
	const { data: scoreBoardData } = useGetScoreBoardQuery();

	if (groupsData?.groups.length === 0) {
		return (
			<Center h='25vh'>
				<Title>Nie posiadasz żadnych grup</Title>
			</Center>
		);
	}

	const selectLabels = groupsData?.groups?.map((group) => group.groupName);

	const { data: StudentsFromGroup, isPending } = useGetStudentsFromGroup(
		groupsData?.groups[0].groupId!
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
			<ScoreBoardLecturer type='group' scoreBoardData={scoreBoardData} />
		</Stack>
	);
}

export default ScoreBoardLecturerPage;
