import { getPreviousLessonsImagesQueryFn } from '@/utils/axios-queries';
import { useQuery } from '@tanstack/react-query';

export function useGetPreviousLessonsImagesMutation(groupId: number | null) {
	const query = useQuery({
		enabled: !!groupId,
		queryKey: ['previousLessonPhotos', groupId],
		queryFn: () => getPreviousLessonsImagesQueryFn(groupId!),
	});

	return query;
}
