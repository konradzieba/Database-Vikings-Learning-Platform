import {
	Avatar,
	Button,
	Center,
	Flex,
	Group,
	Paper,
	ScrollArea,
	SimpleGrid,
	Space,
	Stack,
	Stepper,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core';
import { IconArrowUpRight, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import lesson1 from '@/assets/lesson1.png';
import { useState } from 'react';
import { set } from 'zod';

const data = {
	lessonNumber: 4,
	groupName: 'Grupa 2 ISI',
	taskNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
	avatars: [
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
		lesson1,
		lesson1,
	],
};

interface TaskTabProps {
	taskNumber: number;
}
function TaskTab({ taskNumber }: TaskTabProps) {
	return (
		<Button
			miw={150}
			variant='default'
			leftSection={<Text size='sm'>{`Zadanie ${taskNumber}`}</Text>}
			rightSection={<IconArrowUpRight size='1.4rem' />}
		></Button>
	);
}

function CreateLessonPage() {
	// const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
	// const navigate = useNavigate();

	// const handleCreateLesson = () => {
	// 	console.log('Tworzenie lekcji bez sprawdzania obecności');
	// };

	// const handleCreateLessonAndCheckFrequency = () => {
	// 	console.log('Tworzenie lekcji i sprawdzenie obecności');
	// 	navigate('/dashboard/group/1/lessons/checkFrequency');
	// };

	const [activeStep, setActiveStep] = useState(1);
	const nextStep = () => {
		setActiveStep((current) => (current < 3 ? current + 1 : current));
	};
	const prevStep = () => {
		setActiveStep((current) => (current > 0 ? current - 1 : current));
	};
	const isLastStep = activeStep === 3;

	return (
		<Stack mt={rem(-30)}>
			<Stepper
				w='50%'
				mx='auto'
				active={activeStep}
				onStepClick={setActiveStep}
			>
				<Stepper.Step allowStepSelect={false} label='Tworzenie zadania'>
					<Space h={rem(60)} />
					<SimpleGrid mx='auto' w='30%' cols={2} spacing='md'>
						{data.taskNumbers.map((taskNumber) => (
							<TaskTab key={taskNumber} taskNumber={taskNumber} />
						))}
					</SimpleGrid>
				</Stepper.Step>
				<Stepper.Step allowStepSelect={false} label='Wybór grafiki lekcji'>
					<SimpleGrid cols={3} spacing='md'>
						{data.avatars.map((avatar) => (
							<Avatar key={avatar} src={avatar} size={rem(80)} radius='lg' />
						))}
					</SimpleGrid>
				</Stepper.Step>
				<Stepper.Step
					allowStepSelect={false}
					label='Sprawdzanie obecności'
				></Stepper.Step>
				{/* <Stepper.Completed>Lekcja została stworzona</Stepper.Completed> */}
			</Stepper>
			<Group>
				<Button variant='outline' onClick={prevStep}>
					Cofnij
				</Button>
				<Button onClick={nextStep}>
					{isLastStep ? 'Stwórz lekcje' : 'Dalej'}
				</Button>
			</Group>
		</Stack>
	);
}

export default CreateLessonPage;
