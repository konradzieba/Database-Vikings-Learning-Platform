import { useCreateLessonMutation } from '@/hooks/lessons/useCreateLessonMutation';
import { CreatedLessonType } from '@/utils/store';
import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

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
	//TODO clear lesson after creation, maybe in hook
	const handleCreateLesson = () => {
		createLessonMutation({
			number: innerProps.createdLesson.lessonNumber,
			image: innerProps.createdLesson.lessonImage,
			groupId: innerProps.createdLesson.groupId,
			isFrequencyChecked: innerProps.createdLesson.isFrequencyChecked,
			tasks: innerProps.createdLesson.tasks,
		});
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModalWithFinalStep = () => {
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
			<Text>Ilość zadań: {innerProps.createdLesson.tasks.length}</Text>
			<Text>Zdjęcie: {innerProps.createdLesson.lessonImage}</Text>
			<Text>Czy obecność została sprawdzona? {innerProps.createdLesson.isFrequencyChecked}</Text>
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
