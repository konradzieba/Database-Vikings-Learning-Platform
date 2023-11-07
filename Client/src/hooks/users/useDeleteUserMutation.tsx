import { deleteUserMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

export function useDeleteUserMutation(userId: number | null) {
	const deleteUserMutation = useMutation({
		mutationFn: () => deleteUserMutationFn(userId!),
		onError: (error) => {
			console.error(error);
		},
	});

	return deleteUserMutation;
}
