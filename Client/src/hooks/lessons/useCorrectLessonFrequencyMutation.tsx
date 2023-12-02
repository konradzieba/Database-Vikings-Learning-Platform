import { correctLessonFrequencyListMutationFn } from '@/utils/axios-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCorrectLessonFrequencyMutation(lessonId: number, newAbsentStudentList: number[]) {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => correctLessonFrequencyListMutationFn(lessonId, newAbsentStudentList),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [`absentStudents${lessonId}`, 'absentStudents'],
			});
		},
	});
	return mutation;
}
