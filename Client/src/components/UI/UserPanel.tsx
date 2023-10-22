import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { Button, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface UserPanelProps {
	email: string;
	className?: string;
}

function UserPanel({ email, className }: UserPanelProps) {
	const logoutMutation = useLogoutMutation();

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Potwierdź wylogowanie',
			children: <Text size='sm'>Czy na pewno chcesz się wylogować?</Text>,
			labels: { confirm: 'Wyloguj', cancel: 'Anuluj' },
			confirmProps: { color: 'var(--bad-state-color)' },
			onConfirm: () => {
				logoutMutation.mutate();
				modals.closeAll();
			},
		});

	return (
		<Stack gap={0} align='flex-end'>
			<Text size='lg' fw={500}>
				{email}
			</Text>
			<Button ta='right' variant='transparent' px={0} onClick={openDeleteModal}>
				<Text size='lg' fw={500} className={className}>
					Wyloguj
				</Text>
			</Button>
		</Stack>
	);
}

export default UserPanel;
