import { Button, Divider, Group } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

interface CorrectFrequencyListProps {
	modalBody: string;
	lessonId: number;
	newStudentListIds: number[];
	oldStudentListIds: number[];
	isFrequencyChecked: boolean;
}

function CorrectFrequencyModal({ innerProps, context, id }: ContextModalProps<CorrectFrequencyListProps>) {
	const handleCorrectFrequency = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<>
			<p>ID lekcji = {innerProps.lessonId}</p>
			<p>ID nowych nieobecnych studentów</p>
			{innerProps.newStudentListIds.map(id => (
				<span> {id}</span>
			))}
			<p>ID starych nieobecnych studentów</p>
			{innerProps.oldStudentListIds.map(id => (
				<span> {id}</span>
			))}
			<Divider />

			<Group justify='center'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleCorrectFrequency}>
					Potwierdź
				</Button>
			</Group>
		</>
	);
}

export default CorrectFrequencyModal;
