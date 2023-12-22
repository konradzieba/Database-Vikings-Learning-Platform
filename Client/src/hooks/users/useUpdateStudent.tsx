import { updateStudentMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IStudentInfo {
	firstName: string;
	lastName: string;
	indexNumber: number;
	score: number;
	health: number;
}

export function useUpdateStudent(studentId: number, studentInfo: IStudentInfo) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => updateStudentMutationFn(studentId, studentInfo),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studentsFromGroup'],
			});
		},
	});

	return mutation;
}
