import { changeDefaultPasswordMutationFn } from '@/utils/axios-queries';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';

export function useChangeDefaultPasswordMutation() {
	const changeDefaultPasswordMutation = useMutation({
		mutationFn: changeDefaultPasswordMutationFn,
		onSuccess: () => {
			modals.closeAll();
			modals.openConfirmModal({
				title: 'Sukces!',
				children: <Text size='sm'>Twoje hasło zostało zmienione pomyślnie!</Text>,
				labels: { confirm: 'Rozumiem', cancel: '' },
				cancelProps: { display: 'none' },
				confirmProps: { fullWidth: true },
			});
		},
		onError: error => {
			console.error(error);
			modals.closeAll();
			modals.openConfirmModal({
				title: 'Błąd...',
				children: (
					<Text size='sm'>Podczas zmiany hasła wystąpił nieoczekiwany błąd. Spróbuj po ponownym zalogowaniu.</Text>
				),
				labels: { confirm: 'Rozumiem', cancel: '' },
				cancelProps: { display: 'none' },
				confirmProps: { fullWidth: true, color: 'var(--bad-state-color)' },
			});
		},
	});

	return changeDefaultPasswordMutation;
}
