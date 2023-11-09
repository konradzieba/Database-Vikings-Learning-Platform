import { useEffect, useState } from 'react';
import { changeDefaultPasswordSchema } from '@/components/UI/ChangeDefaultPassword.schema';
import PasswordStrength from '@/components/UI/PasswordStrength';
import { Button, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { useChangeDefaultPasswordMutation } from '@/hooks/users/useChangeDefaultPasswordMutation';

function ChangeDefaultPasswordModal({ innerProps }: ContextModalProps<{ modalBody: string }>) {
	const form = useForm({
		validate: zodResolver(changeDefaultPasswordSchema),
		initialValues: {
			password: '',
		},
	});

	const { mutate, isPending } = useChangeDefaultPasswordMutation();

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		if (form.isValid()) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [form.values.password]);

	const handleChangePassword = (values: { password: string }) => {
		mutate(values);
	};

	return (
		<Stack>
			<Text size='sm'>{innerProps.modalBody}</Text>

			<form onSubmit={form.onSubmit(handleChangePassword)}>
				<Stack>
					<PasswordStrength form={form} />
					<Button fullWidth type='submit' disabled={isButtonDisabled} loading={isPending}>
						{isPending ? '' : 'Zmień hasło'}
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}

export default ChangeDefaultPasswordModal;
