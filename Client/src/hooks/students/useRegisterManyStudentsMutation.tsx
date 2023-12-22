import { TRegisterManyStudentsRequest } from '@/types/RequestTypes';
import { registerManyStudentsMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRegisterManyStudentsMutation(
	mutationData: TRegisterManyStudentsRequest
) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => registerManyStudentsMutationFn(mutationData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['studentsFromGroup'] });
		},
	});

	return mutation;
}
