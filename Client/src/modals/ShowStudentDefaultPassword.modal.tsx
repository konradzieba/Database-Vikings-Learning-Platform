import { decodeDefaultPassword } from '@/utils/decodeDefaultPassword';
import { ActionIcon, Button, Group, Text, rem } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { ContextModalProps } from '@mantine/modals';
import { IconCopy } from '@tabler/icons-react';

interface StudentDefaultPasswordModalProps {
	firstName: string;
	lastName: string;
	indexNumber: number;
}

function showStudentDefaultPasswordModal({
	context,
	id,
	innerProps,
}: ContextModalProps<StudentDefaultPasswordModalProps>) {
	const clipboard = useClipboard({ timeout: 800 });
	const decodedPassword = decodeDefaultPassword(
		innerProps.firstName,
		innerProps.lastName,
		innerProps.indexNumber
	);
	return (
		<>
			<Text size='sm'>
				Domyślne hasło dla studenta&nbsp;
				<Text span fw={500}>
					{innerProps.firstName} {innerProps.lastName}
				</Text>
				:
				<Group mt='xs' justify='center' align='center' gap={rem(5)}>
					<Text fz='md' lts={rem(0.5)} fw={500}>
						{decodedPassword}
					</Text>
					<ActionIcon
						title='Skopiuj'
						size='md'
						variant='transparent'
						c={clipboard.copied ? 'var(--good-state-color)' : 'dimmed'}
						onClick={() => clipboard.copy(decodedPassword)}
					>
						<IconCopy />
					</ActionIcon>
				</Group>
			</Text>
			<Button mt='md' fullWidth>
				Zamknij
			</Button>
		</>
	);
}

export default showStudentDefaultPasswordModal;
