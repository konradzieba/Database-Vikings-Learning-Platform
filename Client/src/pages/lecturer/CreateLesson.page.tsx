import { Button, Flex, Group, Stack, Stepper, Title, rem } from '@mantine/core';
import lesson1 from '@/assets/lesson1.png';
import { useState } from 'react';
import { IconCheck, IconChecklist, IconList, IconPhoto } from '@tabler/icons-react';
import PhotoPicker from '@/components/CreateLesson/PhotoPicker/Photo.picker';
import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import LessonCreated from '@/components/CreateLesson/LessonCreated/LessonCreated.component';
import test from '@/assets/lessonCreatedImage.png';
import TasksCardList from '@/components/CreateLesson/TaskCard/TasksCard.list';
import { useNavigate } from 'react-router-dom';

const data = {
	lessonNumber: 4,
	groupName: 'Grupa 2 ISI',
	taskNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	avatars: [
		lesson1,
		test,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
	],
};

function CreateLessonPage() {
	const [activeStep, setActiveStep] = useState(0);
	const navigate = useNavigate();

	const nextStep = () => {
		setActiveStep(current => (current < 3 ? current + 1 : current));
	};
	const prevStep = () => {
		setActiveStep(current => (current > 0 ? current - 1 : current));
	};
	const isLastStep = activeStep === 2;

	return (
		<Stack mt={rem(-20)} gap={0}>
			<Title mx='auto'>Lekcja&nbsp;1</Title>
			<Stepper
				w='50%'
				mx='auto'
				mt='xs'
				active={activeStep}
				onStepClick={setActiveStep}
				completedIcon={<IconCheck size='1.2rem' />}>
				<Stepper.Step allowStepSelect={false} label='Tworzenie zadań' icon={<IconList size='1.2rem' />}>
					<TasksCardList tasksNumbers={data.taskNumbers} />
				</Stepper.Step>
				<Stepper.Step allowStepSelect={false} label='Wybór grafiki lekcji' icon={<IconPhoto size='1.2rem' />}>
					<PhotoPicker avatars={data.avatars} />
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
						<Button miw={150} onClick={nextStep}>
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
		</Stack>
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
