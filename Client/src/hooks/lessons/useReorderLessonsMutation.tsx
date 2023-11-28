import { TReorderLessonRequest } from '@/types/RequestTypes';
import { reorderLessonsMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useReorderLessonsMutation(
	groupId: number,
	newLessonsOrder: TReorderLessonRequest
) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => reorderLessonsMutationFn(groupId, newLessonsOrder),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lessonsByGroup'] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return mutation;
}
