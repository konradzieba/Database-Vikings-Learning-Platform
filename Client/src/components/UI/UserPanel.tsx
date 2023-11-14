import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { Button, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface UserPanelProps {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	className?: string;
}

function UserPanel({ firstName, lastName, email, className }: UserPanelProps) {
	const logoutMutation = useLogoutMutation();

	const studentName =
		firstName && lastName ? `${firstName[0].toUpperCase()}. ${lastName}` : '';

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
			<Group w='100%' justify='space-between'>
				<Text size='lg' fw={500} c='dimmed'>
					{studentName}
				</Text>
				<Button
					ta='right'
					variant='transparent'
					px={0}
					onClick={openLogoutModal}
				>
					<Text size='lg' fw={500} className={className}>
						Wyloguj
					</Text>
				</Button>
			</Group>
		</Stack>
	);
}

export default UserPanel;
