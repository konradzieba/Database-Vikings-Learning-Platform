import { useDeleteLessonMutation } from '@/hooks/lessons/useDeleteLessonMutation';
import { useGetPreDeleteLessonInfoQuery } from '@/hooks/lessons/useGetPreDeleteLessonInfoQuery';
import { useMeQuery } from '@/hooks/users/useMeQuery';
import {
	Anchor,
	Box,
	Button,
	Center,
	Collapse,
	Flex,
	Group,
	List,
	Loader,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconChevronDown,
	IconChevronUp,
	IconCircleCheck,
	IconCircleX,
	IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';

const getTasksPlural = (taskAmount: number) => {
	if (taskAmount === 1) return 'zadanie';
	if (taskAmount > 1 && taskAmount < 5) return 'zadania';
	if (taskAmount >= 5) return 'zadań';
};

function DeleteLessonModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{
	lessonId: number;
}>) {
	const [isListOpen, setIsListOpen] = useState(false);
	const {
		mutate,
		isPending: isDeleting,
		isSuccess: isMutationSuccess,
		isError: isMutationError,
	} = useDeleteLessonMutation(innerProps.lessonId);

	const {
		data: preDeleteLessonInfoData,
		isLoading: isPreDeleteLessonInfoLoading,
		isError: isPreDeleteLessonInfoError,
	} = useGetPreDeleteLessonInfoQuery(innerProps.lessonId);

	const { refetch: refetchMeQuery } = useMeQuery();

	const handleCloseModal = () => {
		refetchMeQuery();
		context.closeModal(id);
		modals.closeAll();
	};

	const handleDeleteGroup = () => {
		mutate();
	};

	if (isDeleting || isPreDeleteLessonInfoLoading) {
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
					<Text>Lekcja została usunięta!</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isMutationError || isPreDeleteLessonInfoError) {
		<>
			<Flex direction='column' align='center' gap='md' mb='md'>
				<IconCircleX size='3rem' color='var(--bad-state-color)' />
				<Text>
					Wystąpił problem podczas{' '}
					{isMutationError
						? 'przesyłania zadania'
						: 'wczytywania danych z lekcji'}
					.
				</Text>
			</Flex>
			<Button fullWidth onClick={handleCloseModal}>
				Rozumiem
			</Button>
		</>;
	}

	const amountOfAnswersPlural =
		preDeleteLessonInfoData?.lessonInfo.sendAnswersAmount === 1
			? 'odpowiedź'
			: 'odpowiedzi';
	const taskPlural = preDeleteLessonInfoData?.lessonInfo.taskAmount
		? getTasksPlural(preDeleteLessonInfoData?.lessonInfo.taskAmount)
		: null;

	const listItems = preDeleteLessonInfoData?.lessonInfo.studentsWithAnswers.map(
		(student) => {
			return (
				<List.Item key={student.studentId}>
					{`${student.firstName} ${student.lastName}`}
				</List.Item>
			);
		}
	);

	return (
		<Box p='sm'>
			<Text fw={500} size='sm'>
				Czy na pewno chcesz usunąć lekcję nr&nbsp;
				<Text fw='inherit' span c='var(--mantine-primary-color-lighter)'>
					{preDeleteLessonInfoData?.lessonInfo.lessonNumber}
				</Text>
				?
			</Text>
			<Text mt='xs' size='sm'>
				<Text size='sm' span fw={500}>
					Uwaga!&nbsp;
				</Text>
				Ta lekcja zawiera&nbsp;
				<Text span size='sm' c='var(--mantine-primary-color-lighter)'>
					{preDeleteLessonInfoData?.lessonInfo.taskAmount}
				</Text>
				&nbsp;
				{taskPlural}. Po usunięciu lekcji, wszystkie zadania przypisane do
				lekcji zostaną usunięte.
			</Text>
			{preDeleteLessonInfoData?.lessonInfo.sendAnswersAmount !== 0 && (
				<>
					<Text mt='xs' size='sm'>
						Dodatkowo na tą lekcje zostały udzielone już&nbsp;
						<Text
							span
							fw={500}
							size='sm'
							c='var(--mantine-primary-color-lighter)'
						>
							{preDeleteLessonInfoData?.lessonInfo.sendAnswersAmount}
						</Text>
						&nbsp;
						{amountOfAnswersPlural}. Po usunięciu lekcji, wszystkie odpowiedzi
						zostaną usunięte, a punkty ewentualne przyznane punkty zostaną
						odebrane.
					</Text>
					<Text mt='xs' size='sm'>
						Rozwiń listę, aby zobaczyć studentów których odpowiedzi zostały
						przesłane.
					</Text>
					<Button
						mt='xs'
						fullWidth
						variant='outline'
						leftSection={isListOpen ? <IconChevronUp /> : <IconChevronDown />}
						onClick={() => setIsListOpen((prevState) => !prevState)}
					>
						{isListOpen ? 'Zwiń listę' : 'Rozwiń listę'}
					</Button>
					<Collapse in={isListOpen}>
						<List
							mt='xs'
							spacing='xs'
							size='sm'
							center
							icon={
								<ThemeIcon
									variant='transparent'
									color='var(--mantine-primary-color-lighter)'
									size={rem(20)}
								>
									<IconUser />
								</ThemeIcon>
							}
						>
							{listItems}
						</List>
					</Collapse>
				</>
			)}
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

export default DeleteLessonModal;
