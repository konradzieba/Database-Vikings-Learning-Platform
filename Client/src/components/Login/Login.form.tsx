import {
	Box,
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
	rem,
} from '@mantine/core';
import classes from './Login.form.module.css';
import ReactTypingEffect from 'react-typing-effect';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from './Login.schema';
import { useLoginMutation } from '@/hooks/auth/useLoginMutation';

function Header() {
	return (
		<Stack align='center' gap={rem(1)}>
			<Title order={1} fz={rem(48)} tt='uppercase'>
				Bazy danych
			</Title>
			<Title order={2} fz={rem(24)} tt='uppercase'>
				<Text span className={classes.sql}>
					SELECT
				</Text>
				&nbsp;student&nbsp;
				<Text span className={classes.sql}>
					FROM
				</Text>
				&nbsp;
				<ReactTypingEffect
					text={['uczelnia', 'grupa', 'informatyka', 'kortowo']}
					cursorClassName={classes.typingCursor}
					speed={250}
					typingDelay={1250}
					eraseDelay={2500}
				/>
				<Text span className={classes.sql}>
					;
				</Text>
			</Title>
		</Stack>
	);
}

function Form() {
	const form = useForm({
		validate: zodResolver(loginSchema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const loginMutation = useLoginMutation({ form });

	return (
		<Stack gap={rem(0)} miw={rem(400)}>
			<form
				className={classes.form}
				onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
			>
				<Box>
					<TextInput
						required={false}
						withAsterisk={false}
						pb={form.errors['email'] ? 0 : rem(21.8)}
						size='md'
						label='Email:'
						placeholder='Email...'
						classNames={{
							input: form.errors['email'] ? classes.inputError : classes.input,
						}}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						required={false}
						pb={form.errors['password'] ? 0 : rem(21.8)}
						withAsterisk={false}
						size='md'
						mt={rem(5)}
						label='Hasło:'
						placeholder='Hasło...'
						classNames={{
							input: form.errors['password']
								? classes.inputError
								: classes.input,
							visibilityToggle: classes.visibilityToggler,
						}}
						{...form.getInputProps('password')}
					/>
				</Box>
				<Button
					type='submit'
					my='xs'
					className={classes.loginBtn}
					loading={loginMutation.isPending}
				>
					{loginMutation.isPending ? '' : 'Zaloguj'}
				</Button>
			</form>
		</Stack>
	);
}

function LoginForm() {
	return (
		<Stack align='center' h='100vh' py={160}>
			<Header />
			<Form />
		</Stack>
	);
}

export default LoginForm;
