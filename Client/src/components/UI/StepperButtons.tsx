import { CreatedLessonType } from '@/types/StoreTypes';
import { Button, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

interface StepperButtonsProps {
	activeStep: number;
	createdLessonsArray: CreatedLessonType[];
	groupId: number;
	nextStep: () => void;
	prevStep: () => void;
	handleCreateLesson: () => void;
	handleCreateLessonWithoutFrequency: () => void;
}

function StepperButtons({
	activeStep,
	createdLessonsArray,
	groupId,
	nextStep,
	prevStep,
	handleCreateLesson,
	handleCreateLessonWithoutFrequency,
}: StepperButtonsProps) {
	const navigate = useNavigate();

	const isTaskButtonDisabled =
		createdLessonsArray.find((lesson) => lesson.groupId === +groupId!)?.tasks
			.length === 0
			? true
			: false;
	const isPhotoButtonDisabled =
		createdLessonsArray.find((lesson) => lesson.groupId === +groupId!)
			?.lessonImage === ''
			? true
			: false;
	return (
		<Group mx='auto'>
			{activeStep === 0 && (
				<>
					<Button
						miw={150}
						variant='outline'
						color='var(--mantine-primary-color)'
						onClick={() => navigate(-1)}
					>
						Wróć
					</Button>
					<Button miw={150} onClick={nextStep} disabled={isTaskButtonDisabled}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 1 && (
				<>
					<Button
						miw={150}
						variant='outline'
						color='var(--mantine-primary-color)'
						onClick={prevStep}
					>
						Cofnij
					</Button>
					<Button miw={150} onClick={nextStep} disabled={isPhotoButtonDisabled}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 2 && (
				<>
					<Button
						miw={150}
						variant='outline'
						color='var(--mantine-primary-color)'
						onClick={prevStep}
					>
						Cofnij
					</Button>
					<Button
						miw={150}
						variant='outline'
						onClick={handleCreateLessonWithoutFrequency}
					>
						Stwórz lekcję bez sprawdzania obecności
					</Button>
					<Button miw={150} onClick={handleCreateLesson}>
						Stwórz lekcje
					</Button>
				</>
			)}
			{activeStep === 3 && (
				<>
					<Button
						miw={150}
						onClick={() => console.log('Generowanie pdf')}
						variant='outline'
					>
						Wygeneruj PDF z listą obecności
					</Button>
					<Button
						component={Link}
						to={`/dashboard/group/${groupId}/lessons`}
						miw={150}
					>
						Przejdź do wszystkich lekcji
					</Button>
				</>
			)}
		</Group>
	);
}

export default StepperButtons;
