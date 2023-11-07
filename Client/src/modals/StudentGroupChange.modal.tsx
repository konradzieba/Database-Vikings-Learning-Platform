import { useState } from 'react';
import { useLecturerStore } from '@/utils/store';
import { Button, Flex, Group, Select, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { useChangeStudentGroupMutation } from '@/hooks/students/useChangeStudentGroup';

function StudentGroupChangeModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string }>) {
	const { groups } = useLecturerStore();
	// const { data, isPending, isSuccess } = useChangeStudentGroupMutation(studentId, groupId);
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

	const selectGroupData = groups?.map((group) => ({
		id: group.groupId,
		label: group.groupName,
	}));

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleChangeStudentGroup = () => {
		const groupId = selectGroupData?.find(
			(group) => group.label === selectedGroup
		)?.id;
		if (!groupId) return;
		console.log(groupId);
		// console.log(object);
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<Flex direction='column' gap='sm'>
			<Text>
				Obecna grupa{' '}
				<Text span fw={500} c='var(--mantine-primary-color)'>
					{innerProps.modalBody}
				</Text>
			</Text>
			<Select
				value={selectedGroup}
				label='Wybierz grupę'
				placeholder='Grupa...'
				data={selectGroupData?.map((group) => group.label)}
				onChange={(value) => setSelectedGroup(value)}
			/>
			<Group justify='center' mt='sm'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button
					miw={150}
					disabled={!selectedGroup}
					onClick={handleChangeStudentGroup}
				>
					Przenieś
				</Button>
			</Group>
		</Flex>
	);
}

export default StudentGroupChangeModal;
