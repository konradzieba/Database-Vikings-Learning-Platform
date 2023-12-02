import { Flex, Stack, Stepper, Title, rem } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconCheck, IconChecklist, IconList, IconPhoto } from '@tabler/icons-react';
import PhotoPicker from '@/components/CreateLesson/PhotoPicker/Photo.picker';
import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import LessonCreated from '@/components/CreateLesson/LessonCreated/LessonCreated.component';
import TasksCardList from '@/components/CreateLesson/TaskCard/TasksCard.list';
import { useParams } from 'react-router-dom';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { modals } from '@mantine/modals';
import StepperButtons from '@/components/UI/StepperButtons';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';
import { useGetPreviousLessonsImagesMutation } from '@/hooks/lessons/useGetPreviousLessonsImagesMutation';

function CreateLessonPage() {
	const [activeStep, setActiveStep] = useState(0);
	const [frequencyListPDF, setFrequencyListPDF] = useState<{
		newStudentIds: number[] | null;
		studentsFromGroup:
			| {
					id: number;
					firstName: string;
					lastName: string;
					indexNumber: number;
					score: number;
					health: number;
					groupId: number;
					lastLogin: string;
					userId: number;
			  }[]
			| null;
	}>();
	const { createdLessonsArray, addLesson, updateLesson } = useCreateLessonStore();

	const { id } = useParams();

	const { data: LessonsData, isSuccess, isLoading } = useGetLessonsByGroupId(+id!);
	const { data: PreviousLessonsImages } = useGetPreviousLessonsImagesMutation(+id!);

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
					absentStudents: [],
					absentStudentsCredentials: [],
				});
			}
		}
	}, [isSuccess]);

	const nextStep = () => {
		setActiveStep(current => (current < 3 ? current + 1 : current));
	};
	const prevStep = () => {
		setActiveStep(current => (current > 0 ? current - 1 : current));
	};

	const handleCreateLesson = () => {
		const createdLesson = createdLessonsArray.find(lesson => lesson.groupId === +id!);
		if (createdLesson) {
			const createdLessonWithFrequency = { ...createdLesson, isFrequencyChecked: true };
			updateLesson(+id!, createdLesson);

			modals.openContextModal({
				modal: 'previewCreatedLessonInfo',
				title: `Pogląd stworzonej lekcji nr ${createdLessonWithFrequency.lessonNumber}`,
				closeOnClickOutside: false,
				withCloseButton: false,
				innerProps: {
					modalBody: '',
					createdLesson: createdLessonWithFrequency,
					nextStep: nextStep,
				},
			});
		}
	};

	const handleCreateLessonWithoutFrequency = () => {
		const createdLesson = createdLessonsArray.find(lesson => lesson.groupId === +id!);
		if (createdLesson) {
			const createdLessonWithoutFrequency = { ...createdLesson, isFrequencyChecked: false, absentStudents: [] };
			updateLesson(+id!, createdLessonWithoutFrequency);
			modals.openContextModal({
				modal: 'previewCreatedLessonInfo',
				title: `Pogląd stworzonej lekcji nr ${createdLessonWithoutFrequency.lessonNumber}`,
				closeOnClickOutside: false,
				withCloseButton: false,
				innerProps: {
					modalBody: '',
					createdLesson: createdLessonWithoutFrequency,
					nextStep: nextStep,
				},
			});
		}
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
							<PhotoPicker previousLessonsImages={PreviousLessonsImages?.previousLessonsImages} />
						</Stepper.Step>
						<Stepper.Step allowStepSelect={false} label='Sprawdzanie obecności' icon={<IconChecklist size='1.2rem' />}>
							<Flex align='flex-start' mih={rem(550)} mt={rem(45)}>
								<FrequencyList setFrequencyListPDF={setFrequencyListPDF} />
							</Flex>
						</Stepper.Step>
						<Stepper.Completed>
							<LessonCreated />
						</Stepper.Completed>
					</Stepper>
					<StepperButtons
						frequencyListPDF={frequencyListPDF}
						activeStep={activeStep}
						createdLessonsArray={createdLessonsArray}
						groupId={+id!}
						nextStep={nextStep}
						prevStep={prevStep}
						handleCreateLesson={handleCreateLesson}
						handleCreateLessonWithoutFrequency={handleCreateLessonWithoutFrequency}
					/>
				</Stack>
			)}
		</>
	);
}

export default CreateLessonPage;
