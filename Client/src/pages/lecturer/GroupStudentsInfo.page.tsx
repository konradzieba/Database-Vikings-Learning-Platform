import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import DataNotFound from '@/components/UI/DataNotFound';
import useGetStudentsFromGroup from '@/hooks/groups/useGetStudentsFromGroup';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { Button, Center, Flex, Loader } from '@mantine/core';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classes from '@/components/StudentInfoCard/StudentInfo.card.module.css';
import { modals } from '@mantine/modals';

function GroupStudentsInfoPage() {
	const { id } = useParams();
	const { lecturerData } = useLecturerStore();
	const { data: groupsData, isPending: isGetGroupsDataPending } =
		useGetGroupsByLecturerId(lecturerData.lecturerId);
	const { data: StudentsFromGroup, isPending: isGetStudentsFromGroupPending } =
		useGetStudentsFromGroup(+id!);

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

	const currentGroup = groupsData?.groups.find(
		(group) => group.groupId === +id!
	);

	const handleOpenAddStudentToGroupModal = () => {
		modals.openContextModal({
			modal: 'addStudentToGroup',
			title: 'Dodaj studenta do grupy',
			size: 'md',
			closeOnClickOutside: false,
			innerProps: {
				groupId: +id!,
			},
		});
	};

	return (
		<>
			<Flex direction='column' align='center' justify='center' gap='md'>
				{StudentsFromGroup?.students.length === 0 ? (
					<DataNotFound
						firstLineText='Lista studentów'
						secondLineText='jest pusta'
						withAddStudentButton
						groupId={+id!}
					/>
				) : (
					StudentsFromGroup?.students.map((data) => (
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
			{StudentsFromGroup?.students.length !== 0 && (
				<Flex
					w='50%'
					justify='center'
					align='center'
					mt='md'
					mx='auto'
					p='lg'
					className={classes.studentInfoCardContainer}
				>
					<Button miw={150} onClick={handleOpenAddStudentToGroupModal}>
						Dodaj studenta
					</Button>
				</Flex>
			)}
		</>
	);
}

export default GroupStudentsInfoPage;
