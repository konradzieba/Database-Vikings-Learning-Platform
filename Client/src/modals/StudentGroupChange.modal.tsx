import { useState } from 'react';
import { Button, Center, Flex, Group, Loader, Select, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { useChangeStudentGroupMutation } from '@/hooks/students/useChangeStudentGroupMutation';
import { IconCircleCheck, IconCircleX, IconListDetails } from '@tabler/icons-react';

function StudentGroupChangeModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	modalBody: string;
	fullName: string;
	studentId: number;
	groupId: number;
	groups: {
		groupId: number;
		groupName: string;
		lessonsCount: number;
		studentsCount: number;
	}[];
}>) {
	const studentId = innerProps.studentId;
	const groupId = innerProps.groupId;
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

	const selectGroupData = innerProps.groups
		?.filter(group => group.groupId !== innerProps.groupId)
		.map(group => ({
			id: group.groupId,
			label: group.groupName,
		}));

	const newGroupId = selectGroupData?.find(group => group.label === selectedGroup)?.id;

	const {
		mutate: changeStudentGroup,
		isPending,
		isSuccess,
		isError,
	} = useChangeStudentGroupMutation(studentId!, newGroupId!);

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
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
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

	if (isError) {
		<>
			<Flex direction='column' align='center' gap='md' mb='md'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>Wystąpił problem podczas przenoszenia studenta.</Text>
			</Flex>
			<Button fullWidth onClick={handleCloseModal}>
				Rozumiem
			</Button>
		</>;
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
				leftSection={<IconListDetails />}
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
