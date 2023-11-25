import { useCreateLessonMutation } from '@/hooks/lessons/useCreateLessonMutation';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';
import { CreatedLessonType } from '@/types/StoreTypes';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';
import { Button, Center, Collapse, Flex, Group, Image, Loader, Text, rem, AspectRatio, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconChevronDown, IconChevronUp, IconCircleCheck, IconCircleX } from '@tabler/icons-react';

interface PreviewCreatedLessonInfoModalProps {
	createdLesson: CreatedLessonType;
	nextStep: () => void;
}

function PreviewCreatedLessonInfoModal({
	context,
	id,
	innerProps,
}: ContextModalProps<PreviewCreatedLessonInfoModalProps>) {
	const { mutate: createLessonMutation, isError, isPending, isSuccess } = useCreateLessonMutation();
	const { refetch: refetchLessons } = useGetLessonsByGroupId(innerProps.createdLesson.groupId);
	const { removeLesson } = useCreateLessonStore();
	const [openedPhotoPreview, { toggle: togglePhotoPreview }] = useDisclosure(false);
	const [openedAbsentStudentsPreview, { toggle: toggleAbsentStudentsPreview }] = useDisclosure(false);

	const handleCreateLesson = () => {
		createLessonMutation({
			number: innerProps.createdLesson.lessonNumber,
			image: innerProps.createdLesson.lessonImage,
			groupId: innerProps.createdLesson.groupId,
			tasks: innerProps.createdLesson.tasks,
			isFrequencyChecked: innerProps.createdLesson.isFrequencyChecked,
			absentStudents: innerProps.createdLesson.absentStudents,
		});
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModalWithFinalStep = () => {
		refetchLessons();
		removeLesson(innerProps.createdLesson.groupId);
		innerProps.nextStep();
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center mih={157}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>
						Lekcja {innerProps.createdLesson.lessonNumber} została&nbsp;
						<Text span fw={500} c='var(--good-state-color)'>
							stworzona
						</Text>
						.
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModalWithFinalStep}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił problem podczas tworzenia lekcji.</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	return (
		<>
			<Group gap={rem(4)}>
				<Text>Ilość zadań:</Text>
				<Text c='var(--mantine-primary-color)'>{innerProps.createdLesson.tasks.length}</Text>
			</Group>
			<Button
				variant='transparent'
				size='md'
				c='var(--font-color)'
				pl={0}
				onClick={togglePhotoPreview}
				rightSection={openedPhotoPreview ? <IconChevronUp /> : <IconChevronDown />}>
				Zdjęcie
			</Button>
			<Collapse in={openedPhotoPreview}>
				<AspectRatio ratio={1} maw={200} mx='auto'>
					<Image src={innerProps.createdLesson.lessonImage} />
				</AspectRatio>
			</Collapse>

			<Group gap={rem(4)}>
				<Text>Czy obecność została sprawdzona?&nbsp;</Text>
				{innerProps.createdLesson.isFrequencyChecked ? (
					<Text c='var(--mantine-primary-color)'>Tak</Text>
				) : (
					<Text c='var(--bad-state-color)'>Nie</Text>
				)}
			</Group>

			{innerProps.createdLesson.isFrequencyChecked && innerProps.createdLesson.absentStudentsCredentials.length > 0 && (
				<>
					<Button
						variant='transparent'
						size='md'
						c='var(--font-color)'
						pl={0}
						onClick={toggleAbsentStudentsPreview}
						rightSection={openedAbsentStudentsPreview ? <IconChevronUp /> : <IconChevronDown />}>
						Nieobecni studenci
					</Button>
					<Collapse in={openedAbsentStudentsPreview}>
						<Flex gap='sm'>
							{innerProps.createdLesson.absentStudentsCredentials.map(student => (
								<Badge color='gray' size='lg' key={student}>
									{student}
								</Badge>
							))}
						</Flex>
					</Collapse>
				</>
			)}

			<Group justify='center' mt='md'>
				<Button variant='outline' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleCreateLesson}>
					Stwórz
				</Button>
			</Group>
		</>
	);
}

export default PreviewCreatedLessonInfoModal;
