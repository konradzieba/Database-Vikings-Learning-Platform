import { TUpdateTaskInfoRequest } from '@/types/RequestTypes';
import { updateTaskInfoMutationFn } from '@/utils/axios-queries';
import { useMutation } from '@tanstack/react-query';

function useUpdateTaskInfoMutation(taskData: TUpdateTaskInfoRequest) {
	const mutation = useMutation({
		mutationFn: async () => updateTaskInfoMutationFn(taskData),
	});

	return mutation;
}

export default useUpdateTaskInfoMutation;
