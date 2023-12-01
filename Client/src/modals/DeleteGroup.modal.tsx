import { useDeleteGroupMutation } from '@/hooks/groups/useDeleteGroupMutation';
import { useGetPreDeleteGroupInfo } from '@/hooks/groups/useGetPreDeleteGroupInfo';
import { useMeQuery } from '@/hooks/users/useMeQuery';
import { Box, Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

const getStudentsAmountPlural = (studentsAmount: number | undefined) => {
	if (studentsAmount === undefined) {
		return null;
	}
	if (studentsAmount === 1) {
		return 'przypisanego do niej studenta';
	} else {
		return 'przypisanych do niej studentów';
	}
};

const getLessonPlural = (lessonsAmount: number | undefined) => {
	if (lessonsAmount === undefined) {
		return null;
	}
	if (lessonsAmount === 1) {
		return 'przypisaną lekcję';
	} else {
		return 'przypisane lekcje';
	}
};

function DeleteGroupModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	groupName: string;
	groupId: number;
}>) {
	const {
		data: preDeleteGroupInfoData,
		isLoading: isPreDeleteGroupInfoLoading,
		isError: isPreDeleteGroupInfoError,
	} = useGetPreDeleteGroupInfo(innerProps.groupId);

	const {
		mutate,
		isPending: isDeleting,
		isSuccess: isMutationSuccess,
		isError: isMutationError,
	} = useDeleteGroupMutation(innerProps.groupId);

	const { refetch: refetchMeQuery } = useMeQuery();

	const handleCloseModal = () => {
		refetchMeQuery();
		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteGroup = () => {
		mutate();
	};

	if (isDeleting || isPreDeleteGroupInfoLoading) {
		return (
			<Center mih={90}>
				<Loader />
			</Center>
		);
	}

	if (isMutationSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>Grupa została usunięta!</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isMutationError || isPreDeleteGroupInfoError) {
		<>
			<Flex direction='column' align='center' gap='md' mb='md'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>
					Wystąpił problem podczas&nbsp;
					{isMutationError
						? 'przesyłania zadania'
						: 'wczytywania danych z grupy'}
					.
				</Text>
			</Flex>
			<Button fullWidth onClick={handleCloseModal}>
				Rozumiem
			</Button>
		</>;
	}

	const renderDeletionMessage = () => {
		const hasAssignedStudents =
			preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount;
		const hasLessons = preDeleteGroupInfoData?.groupInfo.lessonsAmount;

		if (hasAssignedStudents && hasLessons) {
			return (
				<Text size='sm'>
					<Text size='sm' span fw={500}>
						Uwaga!&nbsp;
					</Text>
					Ta grupa zawiera&nbsp;
					<Text
						span
						size='sm'
						fw={500}
						c='var(--mantine-primary-color-lighter)'
					>
						{preDeleteGroupInfoData?.groupInfo.lessonsAmount}
					</Text>
					&nbsp;lekcję oraz&nbsp;
					<Text span fw={500} c='var(--mantine-primary-color-lighter)'>
						{preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount}
					</Text>
					&nbsp;
					{getStudentsAmountPlural(
						preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount
					)}
					.
					<Text>
						Wszystkie lekcje oraz studenci przypisani do grupy zostaną usunięci
						wraz z nią.
					</Text>
				</Text>
			);
		}

		if (!hasAssignedStudents && hasLessons) {
			return (
				<>
					<Text size='sm'>
						<Text span size='sm'>
							Ta grupa posiada&nbsp;
							<Text
								span
								size='sm'
								fw={500}
								c='var(--mantine-primary-color-lighter)'
							>
								{preDeleteGroupInfoData.groupInfo.lessonsAmount}&nbsp;
							</Text>
							{getLessonPlural(preDeleteGroupInfoData.groupInfo.lessonsAmount)}.
						</Text>
					</Text>
					<Text size='sm'>
						Wszystkie lekcje istniejące w grupie zostaną usunięte wraz z nią.
					</Text>
				</>
			);
		}

		if (hasAssignedStudents && !hasLessons) {
			return (
				<Text size='sm'>
					<Text size='sm' span fw={500}>
						Uwaga!&nbsp;
					</Text>
					Ta grupa zawiera&nbsp;
					<Text span fw={500} c='var(--mantine-primary-color-lighter)'>
						{preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount}
					</Text>
					&nbsp;
					{getStudentsAmountPlural(
						preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount
					)}
					.
					<Text>
						Wszyscy studenci przypisani do grupy zostaną usunięci wraz z nią.
					</Text>
				</Text>
			);
		}

		return null;
	};

	return (
		<Box p='sm'>
			<Text fw={500} size='sm'>
				Czy na pewno chcesz usunąć grupę&nbsp;
				<Text fw='inherit' span c='var(--mantine-primary-color-lighter)'>
					{innerProps.groupName}
				</Text>
				?
			</Text>
			<Text mt='sm' size='sm'>
				{/* {preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount &&
				preDeleteGroupInfoData.groupInfo.lessonsAmount ? (
					<>
						<Text size='sm' span fw={500}>
							Uwaga!&nbsp;
						</Text>
						Ta grupa zawiera&nbsp;
						<Text span size='sm' c='var(--mantine-primary-color-lighter)'>
							{preDeleteGroupInfoData?.groupInfo.lessonsAmount}
						</Text>
						&nbsp;lekcję oraz&nbsp;
						<Text span size='sm' c='var(--mantine-primary-color-lighter)'>
							{preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount}
						</Text>
						&nbsp;
						{getStudentsAmountPlural(
							preDeleteGroupInfoData?.groupInfo.assignedStudentsAmount
						)}
					</>
				) : null} */}
			</Text>

			{renderDeletionMessage()}
			<Group mt='xl' justify='center'>
				<Button variant='default' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button bg='red' miw={150} onClick={handleDeleteGroup}>
					Usuń
				</Button>
			</Group>
		</Box>
	);
}

export default DeleteGroupModal;
