import { changeStudentGroupMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

export function useChangeStudentGroupMutation(
	studentId: number | null,
	groupId: number | null
) {
	const mutation = useMutation({
		mutationFn: () => changeStudentGroupMutationFn(studentId!, groupId!),
	});

	return mutation;
}
