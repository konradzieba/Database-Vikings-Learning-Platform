import { changeStudentGroupMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

export function useChangeStudentGroupMutation(
	studentId: number | null,
	newGroupId: number | null
) {
	const changeStudentGroupMutation = useMutation({
		mutationFn: () => changeStudentGroupMutationFn(studentId!, newGroupId!),
		onError: (error) => {
			console.error(error);
		},
	});

	return changeStudentGroupMutation;
}
