import { Button, Flex, Group, Stack, Stepper, Title, rem } from '@mantine/core';
import { useState } from 'react';
import { IconCheck, IconChecklist, IconList, IconPhoto } from '@tabler/icons-react';
import PhotoPicker from '@/components/CreateLesson/PhotoPicker/Photo.picker';
import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import LessonCreated from '@/components/CreateLesson/LessonCreated/LessonCreated.component';
import TasksCardList from '@/components/CreateLesson/TaskCard/TasksCard.list';
import { useNavigate } from 'react-router-dom';

const data = {
	lessonNumber: 4,
	groupName: 'Grupa 2 ISI',
	taskNumbers: [],
};

export type TaskProps = {
	number: number;
	question: string;
	closeDate: string;
	isMarkDown: boolean;
	isExtra: boolean;
	lessonId: number;
};

function CreateLessonPage() {
	const [activeStep, setActiveStep] = useState(0);
	const [lessonNumber, setLessonNumber] = useState<number | null>(null);
	const [groupId, setGroupId] = useState<number | null>(null);
	const [tasks, setTasks] = useState<TaskProps[]>([]);
	const [lessonImage, setLessonImage] = useState<string | null>(null);

	const handleCreateLesson = () => {
		console.log('LESSON DATA');
		console.log('lessonNumber', lessonNumber);
		console.log('GroupId', groupId);
		console.log('Tasks', tasks);
		console.log('LessonImage', lessonImage);
	};

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
					<TasksCardList tasks={tasks} />
				</Stepper.Step>
				<Stepper.Step allowStepSelect={false} label='Wybór grafiki lekcji' icon={<IconPhoto size='1.2rem' />}>
					<PhotoPicker lessonImage={lessonImage} setLessonImage={setLessonImage} />
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
