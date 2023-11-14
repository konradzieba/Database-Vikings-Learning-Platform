import { createLessonMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

export function useCreateLessonMutation() {
	const createLessonMutation = useMutation({
		mutationFn: createLessonMutationFn,
	});

	return createLessonMutation;
}
