import { getPreDeleteLessonInfoQueryFn } from "@/utils/axios-queries";
import { useQuery } from "@tanstack/react-query";

export function useGetPreDeleteLessonInfoQuery(lessonId: number) {
    const query = useQuery({
        queryKey: ['preDeleteLessonInfo', lessonId],
        queryFn: () => getPreDeleteLessonInfoQueryFn(lessonId),
    });
    return query;
}
