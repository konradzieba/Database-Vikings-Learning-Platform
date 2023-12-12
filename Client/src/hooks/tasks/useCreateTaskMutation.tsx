import { createTaskMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

function useCreateTaskMutation() {
	const mutation = useMutation({
		mutationFn: createTaskMutationFn,
	});

	return mutation;
}

export default useCreateTaskMutation;
