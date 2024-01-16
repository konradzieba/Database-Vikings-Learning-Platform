import { restoreDefaultPasswordMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

function useRestoreDefaultPassword(studentId: number) {
	const mutation = useMutation({
		mutationFn: () => restoreDefaultPasswordMutationFn(studentId),
	});

	return mutation;
}

export default useRestoreDefaultPassword;
