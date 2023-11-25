import { TRegisterManyStudentsRequest } from '@/types/RequestTypes';
import { registerManyStudentsMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

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
