import { deleteLessonMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteLessonMutation(lessonId: number) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => deleteLessonMutationFn(lessonId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['groups'],
			});
		},
	});
	return mutation;
}
