import { useMutation } from "@tanstack/react-query";

export function useDeleteStudentMutation(studentId: number | null) {
    const mutation = useMutation({
        mutationFn: () => deleteStudentMutationFn(studentId!),
    });

    return mutation;
}