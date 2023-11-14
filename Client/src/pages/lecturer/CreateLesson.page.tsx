import { Button, Flex, Group, Stack, Stepper, Title, rem } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconCheck, IconChecklist, IconList, IconPhoto } from '@tabler/icons-react';
import PhotoPicker from '@/components/CreateLesson/PhotoPicker/Photo.picker';
import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import LessonCreated from '@/components/CreateLesson/LessonCreated/LessonCreated.component';
import TasksCardList from '@/components/CreateLesson/TaskCard/TasksCard.list';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useCreateLessonStore } from '@/utils/store';

export type TaskProps = {
	number: number;
	question: string;
	closeDate: string;
	isMarkdown: boolean;
	isExtra: boolean;
};

function CreateLessonPage() {
	const [activeStep, setActiveStep] = useState(0);

	const { createdLessonsArray, addLesson } = useCreateLessonStore();

	const { id } = useParams();

	const handleCreateLesson = () => {
		console.log('createdLessonsArray', createdLessonsArray);
	};

	const { data: LessonsData, isSuccess, isLoading } = useGetLessonsByGroupId(+id!);

	useEffect(() => {
		if (isSuccess) {
			const existingLesson = createdLessonsArray.find(lesson => lesson.groupId === +id!);
			if (!existingLesson) {
				addLesson({ lessonNumber: LessonsData.lessons.length + 1, groupId: +id!, lessonImage: '', tasks: [] });
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
	const isLastStep = activeStep === 2;

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
							<Flex align='center' h={rem(550)}>
								<FrequencyList w='100%' h='85%' />
							</Flex>
						</Stepper.Step>
						<Stepper.Completed>
							<LessonCreated />
						</Stepper.Completed>
					</Stepper>
					<Group mx='auto'>
						{activeStep === 0 && (
							<>
								<Button miw={150} variant='outline' onClick={() => navigate(-1)}>
									Wróć
								</Button>
								<Button miw={150} onClick={nextStep}>
									Dalej
								</Button>
							</>
						)}
						{activeStep > 0 && activeStep < 3 && (
							<>
								<Button miw={150} variant='outline' onClick={prevStep}>
									Cofnij
								</Button>
								<Button miw={150} onClick={isLastStep ? handleCreateLesson : nextStep}>
									{isLastStep ? 'Stwórz lekcje' : 'Dalej'}
								</Button>
							</>
						)}
						{activeStep === 3 && (
							<>
								<Button miw={150} onClick={() => console.log('Generowanie pdf')} variant='outline'>
									Wygeneruj PDF z listą obecności
								</Button>
								<Button miw={150} onClick={() => navigate(`/dashboard/group/9/lessons`)}>
									Przejdź do wszystkich lekcji
								</Button>
							</>
						)}
					</Group>
					<Button onClick={handleCreateLesson}>Test BTN</Button>
				</Stack>
			)}
		</>
	);
}

export default CreateLessonPage;

// {activeStep < 3 ? (
// 	<>

// 		<Button
// 			miw={150}
// 			variant='outline'
// 			disabled={activeStep == 0}
// 			onClick={prevStep}
// 		>
// 			Cofnij
// 		</Button>
// 		<Button miw={150} onClick={nextStep}>
// 			{isLastStep ? 'Stwórz lekcje' : 'Dalej'}
// 		</Button>
// 	</>
// ) : (
// 	<>
// 		{/* Back button only for testing, will be deleted in build */}
// 		<Button miw={150} variant='outline' onClick={prevStep}>
// 			Cofnij
// 		</Button>
// 		<Button miw={150}>Wróć do lekcji</Button>
// 	</>
// )}
