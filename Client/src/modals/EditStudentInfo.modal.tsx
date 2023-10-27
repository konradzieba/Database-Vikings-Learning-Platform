import { Button } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

function EditStudentInfoModal({ context, id, innerProps }: ContextModalProps) {
	const handleEditStudent = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<>
			<Button fullWidth onClick={handleEditStudent}>
				Zapisz
			</Button>
		</>
	);
}

export default EditStudentInfoModal;
