import { useLogoutMutation } from '@/hooks/auth/useLogoutMutation';
import { Button, Stack, Text } from '@mantine/core';

interface UserPanelProps {
	email: string;
	className?: string;
}

function UserPanel({ email, className }: UserPanelProps) {
	const logoutMutation = useLogoutMutation();

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<Stack gap={0} align='flex-end'>
			<Text size='lg' fw={500}>
				{email}
			</Text>
			<Button ta='right' variant='transparent' px={0} onClick={handleLogout}>
				<Text size='lg' fw={500} className={className}>
					Wyloguj
				</Text>
			</Button>
		</Stack>
	);
}

export default UserPanel;
