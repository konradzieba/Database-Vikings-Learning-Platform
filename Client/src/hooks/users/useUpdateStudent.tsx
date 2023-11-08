import { updateStudentMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

interface IStudentInfo {
	firstName: string;
	lastName: string;
	indexNumber: number;
	score: number;
	health: number;
}

export function useUpdateStudent(studentId: number, studentInfo: IStudentInfo) {
	const mutation = useMutation({
		mutationFn: () => updateStudentMutationFn(studentId, studentInfo),
		onError: (error) => {
			console.error(error);
		},
	});

	return mutation;
}
