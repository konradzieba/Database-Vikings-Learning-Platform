import { Flex, Stack, Stepper, Title, rem } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconCheck, IconChecklist, IconList, IconPhoto } from '@tabler/icons-react';
import PhotoPicker from '@/components/CreateLesson/PhotoPicker/Photo.picker';
import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import LessonCreated from '@/components/CreateLesson/LessonCreated/LessonCreated.component';
import TasksCardList from '@/components/CreateLesson/TaskCard/TasksCard.list';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { modals } from '@mantine/modals';
import StepperButtons from '@/components/UI/StepperButtons';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

function CreateLessonPage() {
	const [activeStep, setActiveStep] = useState(0);

	const { createdLessonsArray, addLesson } = useCreateLessonStore();

	const { id } = useParams();

	const handleCreateLesson = () => {
		const createdLesson = createdLessonsArray.find(lesson => lesson.groupId === +id!);
		modals.openContextModal({
			modal: 'previewCreatedLessonInfo',
			title: `Pogląd stworzonej lekcji nr ${createdLesson?.lessonNumber}`,
			closeOnClickOutside: false,
			withCloseButton: false,
			innerProps: {
				modalBody: '',
				createdLesson: createdLesson,
				nextStep: nextStep,
			},
		});
	};

	const { data: LessonsData, isSuccess, isLoading } = useGetLessonsByGroupId(+id!);

	useEffect(() => {
		if (isSuccess) {
			const existingLesson = createdLessonsArray.find(lesson => lesson.groupId === +id!);
			if (!existingLesson) {
				addLesson({
					lessonNumber: LessonsData.lessons.length + 1,
					groupId: +id!,
					lessonImage: '',
					isFrequencyChecked: false,
					tasks: [],
				});
			}
		}
	}, [isSuccess]);

	const navigate = useNavigate();

	const nextStep = () => {
		setActiveStep(current => (current < 3 ? current + 1 : current));
	};
	const prevStep = () => {
		setActiveStep(current => (current > 0 ? current - 1 : current));
	};

	return (
		<>
			{isLoading ? (
				<FullScreenLoader />
			) : (
				<Stack mt={rem(-20)} gap={0}>
					<Title mx='auto'>Lekcja&nbsp;{LessonsData?.lessons.length! + 1}</Title>
					<Stepper
						w='50%'
						mx='auto'
						mt='xs'
						active={activeStep}
						onStepClick={setActiveStep}
						completedIcon={<IconCheck size='1.2rem' />}>
						<Stepper.Step allowStepSelect={false} label='Tworzenie zadań' icon={<IconList size='1.2rem' />}>
							<TasksCardList />
						</Stepper.Step>
						<Stepper.Step allowStepSelect={false} label='Wybór grafiki lekcji' icon={<IconPhoto size='1.2rem' />}>
							<PhotoPicker />
						</Stepper.Step>
						<Stepper.Step allowStepSelect={false} label='Sprawdzanie obecności' icon={<IconChecklist size='1.2rem' />}>
							<Flex align='flex-start' mih={rem(550)} mt={rem(45)}>
								<FrequencyList />
							</Flex>
						</Stepper.Step>
						<Stepper.Completed>
							<LessonCreated />
						</Stepper.Completed>
					</Stepper>
					<StepperButtons
						activeStep={activeStep}
						createdLessonsArray={createdLessonsArray}
						groupId={+id!}
						nextStep={nextStep}
						prevStep={prevStep}
						handleCreateLesson={handleCreateLesson}
					/>
				</Stack>
			)}
		</>
	);
}

export default CreateLessonPage;
