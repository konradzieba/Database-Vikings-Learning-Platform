import { useEffect, useState } from 'react';
import { changeDefaultPasswordSchema } from '@/components/UI/ChangeDefaultPassword.schema';
import PasswordStrength from '@/components/UI/PasswordStrength';
import { Button, Flex, Stack, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps, modals } from '@mantine/modals';
import { useChangeDefaultPasswordMutation } from '@/hooks/users/useChangeDefaultPasswordMutation';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';

function ChangeDefaultPasswordModal({ innerProps, context, id }: ContextModalProps<{ modalBody: string }>) {
	const form = useForm({
		validate: zodResolver(changeDefaultPasswordSchema),
		initialValues: {
			password: '',
		},
	});

	const { mutate, isPending, isSuccess, isError } = useChangeDefaultPasswordMutation();

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

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
					<Text>Hasło zostało zmienione poprawnie.</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił problem podczas zmiany hasła</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

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
