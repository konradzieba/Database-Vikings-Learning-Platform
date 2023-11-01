import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { Button, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface UserPanelProps {
	email: string | null;
	className?: string;
}

function UserPanel({ email, className }: UserPanelProps) {
	const logoutMutation = useLogoutMutation();

	const openLogoutModal = () =>
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
			{email && (
				<Text size='lg' fw={500}>
					{email}
				</Text>
			)}
			<Button ta='right' variant='transparent' px={0} onClick={openLogoutModal}>
				<Text size='lg' fw={500} className={className}>
					Wyloguj
				</Text>
			</Button>
		</Stack>
	);
}

export default UserPanel;
