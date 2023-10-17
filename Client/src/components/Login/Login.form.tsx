import {
	Box,
	Button,
	Loader,
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
import { useMutation } from '@tanstack/react-query';
import { loginQueryFn } from '@/utils/axios-queries';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

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
	const navigate = useNavigate();
	const form = useForm({
		validate: zodResolver(loginSchema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const loginMutation = useMutation({
		mutationFn: loginQueryFn,
		onSuccess: () => {
			navigate('/');
		},
		onError: (error: AxiosError) => {
			if (error.response?.status === 401) {
				form.setFieldError('password', 'Nieprawidłowy email lub hasło');
			} else if (error.response?.status === 400) {
				form.setFieldError('password', 'Nieprawidłowy email lub hasło');
			} else {
				form.setFieldError('password', 'Wystąpił błąd po stronie serwera');
			}
		},
	});

	return (
		<Stack gap={rem(1)} miw={rem(400)}>
			<form
				className={classes.form}
				onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
			>
				<Box>
					<TextInput
						required
						withAsterisk={false}
						size='md'
						label='Email:'
						placeholder='Email...'
						classNames={{
							input: classes.input,
						}}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						required
						withAsterisk={false}
						size='md'
						my='xs'
						label='Hasło:'
						placeholder='Hasło...'
						classNames={{
							input: classes.input,
							visibilityToggle: classes.visibilityToggler,
						}}
						{...form.getInputProps('password')}
					/>
				</Box>
				<Button
					type='submit'
					my='md'
					className={classes.loginBtn}
					disabled={loginMutation.isPending}
				>
					{loginMutation.isPending ? (
						<Loader color='var(--font-color)' size='sm' />
					) : (
						'Zaloguj'
					)}
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
