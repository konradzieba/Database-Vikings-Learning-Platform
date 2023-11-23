import { TRegisterManyStudentsRequest } from '@/types/RequestTypes';
import { registerManyStudentsMutationFn } from '@/utils/axios-queries';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRegisterManyStudentsMutation(
	mutationData: TRegisterManyStudentsRequest
) {
	const mutation = useMutation({
		mutationFn: async () => registerManyStudentsMutationFn(mutationData),
		onError: () => {
			console.log('Nie udało się dodać studentów');
		},
	});

	return mutation;
}
