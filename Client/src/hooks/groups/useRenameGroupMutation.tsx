import { renameGroupMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRenameGroupMutation(groupId: number, newGroupName: string) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => renameGroupMutationFn(groupId, newGroupName),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['groups'],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return mutation;
}
