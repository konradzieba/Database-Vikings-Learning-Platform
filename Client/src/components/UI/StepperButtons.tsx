import { CreatedLessonType } from '@/utils/store';
import { Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface StepperButtonsProps {
	activeStep: number;
	createdLessonsArray: CreatedLessonType[];
	groupId: number;
	nextStep: () => void;
	prevStep: () => void;
	handleCreateLesson: () => void;
}

function StepperButtons({
	activeStep,
	createdLessonsArray,
	groupId,
	nextStep,
	prevStep,
	handleCreateLesson,
}: StepperButtonsProps) {
	const navigate = useNavigate();

	return (
		<Group mx='auto'>
			{activeStep === 0 && (
				<>
					<Button miw={150} variant='outline' onClick={() => navigate(-1)}>
						Wróć
					</Button>
					<Button
						miw={150}
						onClick={nextStep}
						disabled={
							createdLessonsArray.find(lesson => lesson.groupId === +groupId!)?.tasks.length === 0 ? true : false
						}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 1 && (
				<>
					<Button miw={150} variant='outline' onClick={prevStep}>
						Cofnij
					</Button>
					<Button
						miw={150}
						onClick={nextStep}
						disabled={
							createdLessonsArray.find(lesson => lesson.groupId === +groupId!)?.lessonImage === '' ? true : false
						}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 2 && (
				<>
					<Button miw={150} variant='outline' onClick={prevStep}>
						Cofnij
					</Button>
					<Button miw={150} onClick={handleCreateLesson}>
						Stwórz lekcje
					</Button>
				</>
			)}
			{activeStep === 3 && (
				<>
					<Button miw={150} onClick={() => console.log('Generowanie pdf')} variant='outline'>
						Wygeneruj PDF z listą obecności
					</Button>
					<Button miw={150} onClick={() => navigate(`/dashboard/group/${groupId}/lessons`)}>
						Przejdź do wszystkich lekcji
					</Button>
				</>
			)}
		</Group>
	);
}

export default StepperButtons;
