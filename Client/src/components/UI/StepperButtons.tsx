import useGetGroupInfoQuery from '@/hooks/groups/useGetGroupInfoQuery';
import { CreatedLessonType } from '@/types/StoreTypes';
import { Button, Group } from '@mantine/core';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FrequencyListPDF from './FrequencyList.pdf';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

interface StepperButtonsProps {
	activeStep: number;
	createdLessonsArray: CreatedLessonType[];
	groupId: number;
	frequencyListPDF:
		| {
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
		  }
		| undefined;
	nextStep: () => void;
	prevStep: () => void;
	handleCreateLesson: () => void;
	handleCreateLessonWithoutFrequency: () => void;
}

function StepperButtons({
	activeStep,
	createdLessonsArray,
	groupId,
	frequencyListPDF,
	nextStep,
	prevStep,
	handleCreateLesson,
	handleCreateLessonWithoutFrequency,
}: StepperButtonsProps) {
	const navigate = useNavigate();
	const { data: GroupInfo } = useGetGroupInfoQuery(groupId);
	const { removeLesson } = useCreateLessonStore();
	const currentLesson = createdLessonsArray.find(lesson => lesson.groupId === +groupId!);
	
	const isTaskButtonDisabled =
		createdLessonsArray.find(lesson => lesson.groupId === +groupId!)?.tasks.length === 0 ? true : false;
	const isPhotoButtonDisabled =
		createdLessonsArray.find(lesson => lesson.groupId === +groupId!)?.lessonImage === '' ? true : false;

	return (
		<Group mx='auto'>
			{activeStep === 0 && (
				<>
					<Button
						miw={150}
						variant='outline'
						color='var(--mantine-primary-color)'
						onClick={() => {
							removeLesson(groupId);
							navigate(-1);
						}}>
						Wróć
					</Button>
					<Button miw={150} onClick={nextStep} disabled={isTaskButtonDisabled}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 1 && (
				<>
					<Button miw={150} variant='outline' color='var(--mantine-primary-color)' onClick={prevStep}>
						Cofnij
					</Button>
					<Button miw={150} onClick={nextStep} disabled={isPhotoButtonDisabled}>
						Dalej
					</Button>
				</>
			)}
			{activeStep === 2 && (
				<>
					<Button miw={150} variant='outline' color='var(--mantine-primary-color)' onClick={prevStep}>
						Cofnij
					</Button>
					<Button miw={150} variant='outline' onClick={handleCreateLessonWithoutFrequency}>
						Stwórz lekcję bez sprawdzania obecności
					</Button>
					<Button miw={150} onClick={handleCreateLesson}>
						Stwórz lekcje
					</Button>
				</>
			)}
			{activeStep === 3 && (
				<>
					{currentLesson?.isFrequencyChecked && (
						<PDFDownloadLink
							document={
								<FrequencyListPDF
									lessonNumber={currentLesson.lessonNumber}
									groupName={GroupInfo?.group.name!}
									studentsFromGroup={frequencyListPDF?.studentsFromGroup!}
									newStudentListIds={frequencyListPDF?.newStudentIds! || []}
									oldStudentListIds={[]}
									isFrequencyChecked={currentLesson.isFrequencyChecked}
								/>
							}
							fileName={`ListaObecnosci_Lekcja${currentLesson.lessonNumber}_${GroupInfo?.group.name}_BazyDanych`}>
							<Button miw={150} variant='outline'>
								Pobierz PDF
							</Button>
						</PDFDownloadLink>
					)}
					<Button component={Link} to={`..`} miw={150} onClick={() => removeLesson(groupId)}>
						Przejdź do wszystkich lekcji
					</Button>
				</>
			)}
		</Group>
	);
}

export default StepperButtons;
