import {
	TAddStudentToGroupRequest,
	TRegisterManyStudentsRequest,
} from '@/types/RequestTypes';
import { addStudentToGroupMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddStudentToGroupMutation(
	studentData: TAddStudentToGroupRequest
) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => addStudentToGroupMutationFn(studentData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studentsFromGroup', studentData.groupId],
			});
		},
	});

	return mutation;
}
