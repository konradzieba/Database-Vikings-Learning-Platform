import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { IconCheck, IconX } from '@tabler/icons-react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
	return (
		<Text component='div' c={meets ? 'var(--good-state-color)' : 'var(--bad-state-color)'} mt={5} size='sm'>
			<Center inline>
				{meets ? <IconCheck size='0.9rem' stroke={1.5} /> : <IconX size='0.9rem' stroke={1.5} />}
				<Box ml={7}>{label}</Box>
			</Center>
		</Text>
	);
}

const requirements = [
	{ re: /[A-Z]/, label: 'Musi zawierać wielką literę' },
	{ re: /[0-9]/, label: 'Musi zawierać liczbę' },
	{ re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Musi zawierać znak specjalny' },
];

function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach(requirement => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface PasswordStrengthProps {
	form: UseFormReturnType<
		{
			password: string;
		},
		(values: { password: string }) => {
			password: string;
		}
	>;
}

export function PasswordStrength({ form }: PasswordStrengthProps) {
	const currentPassword = form.values.password;
	const strength = getStrength(currentPassword);
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(currentPassword)} />
	));
	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ section: { transitionDuration: '0ms' } }}
				value={currentPassword.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
				color={
					strength > 80
						? 'var(--good-state-color)'
						: strength > 50
						? 'var(--neutral-state-color)'
						: 'var(--bad-state-color)'
				}
				key={index}
				size={4}
			/>
		));

	return (
		<Box>
			<PasswordInput placeholder='Nowe hasło' {...form.getInputProps('password')} />

			<Group gap={5} grow mt='xs' mb='md'>
				{bars}
			</Group>
			<PasswordRequirement label='Hasło musi posiadać co najmniej 8 znaków' meets={currentPassword.length > 5} />
			{checks}
		</Box>
	);
}

export default PasswordStrength;
