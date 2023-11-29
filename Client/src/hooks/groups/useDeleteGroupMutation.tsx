import { deleteGroupMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteGroupMutation(groupId: number) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => deleteGroupMutationFn(groupId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['groups'],
			});
		},
	});

	return mutation;
}
