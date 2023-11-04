import { changeDefaultPasswordMutationFn } from '@/utils/axios-queries';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';

export function useChangeDefaultPasswordMutation() {
	const changeDefaultPasswordMutation = useMutation({
		mutationFn: changeDefaultPasswordMutationFn,
		onSuccess: () => {
			console.log('success');
			modals.closeAll();
		},
		onError: error => {
			console.error(error);
		},
	});

	return changeDefaultPasswordMutation;
}
