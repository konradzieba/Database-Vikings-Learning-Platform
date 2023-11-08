import { useState } from 'react';
import { useLecturerStore } from '@/utils/store';
import { Box, Button, Center, Flex, Group, Loader, Select, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { useChangeStudentGroupMutation } from '@/hooks/students/useChangeStudentGroupMutation';

function StudentGroupChangeModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	modalBody: string;
	fullName: string;
	studentId: number;
	groupId: number;
}>) {
	const { groups } = useLecturerStore();
	const studentId = innerProps.studentId;
	const groupId = innerProps.groupId;
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

	const selectGroupData = groups
		?.filter(group => group.groupId !== innerProps.groupId)
		.map(group => ({
			id: group.groupId,
			label: group.groupName,
		}));

	const newGroupId = selectGroupData?.find(group => group.label === selectedGroup)?.id;

	const { mutate: changeStudentGroup, isPending, isSuccess } = useChangeStudentGroupMutation(studentId!, newGroupId!);

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleChangeStudentGroup = () => {
		if (!groupId || !studentId) {
			return;
		}
		changeStudentGroup();
	};

	if (isPending) {
		return (
			<Center mih={90}>
				<Loader />
			</Center>
		);
	}
	if (isSuccess) {
		return (
			<>
				<Flex align='center' justify='center' mih={90}>
					<Text>
						Student {innerProps.fullName} został przeniesiony do grupy&nbsp;
						<Text span fw={500} c='var(--mantine-primary-color)'>
							{selectedGroup}
						</Text>
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	return (
		<Flex direction='column' gap='sm'>
			<Text>
				Obecna grupa&nbsp;
				<Text span fw={500} c='var(--mantine-primary-color)'>
					{innerProps.modalBody}
				</Text>
			</Text>
			<Select
				value={selectedGroup}
				label='Wybierz grupę'
				placeholder='Grupa...'
				data={selectGroupData?.map(group => group.label)}
				onChange={value => setSelectedGroup(value)}
			/>
			<Group justify='center' mt='sm'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} disabled={!selectedGroup} onClick={handleChangeStudentGroup}>
					Przenieś
				</Button>
			</Group>
		</Flex>
	);
}

export default StudentGroupChangeModal;
