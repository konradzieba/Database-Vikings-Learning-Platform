import { useEffect, useRef } from 'react';
import { useUpdateStudent } from '@/hooks/users/useUpdateStudent';
import {
	Button,
	Center,
	Flex,
	Group,
	Loader,
	NumberInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconCircleCheck,
	IconCircleX,
	IconCoins,
	IconHash,
	IconHeartFilled,
	IconId,
	IconTag,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { EditStudentInfoSchema } from './EditStudentInfo.schema';

interface EditStudentInfoModalInnerProps {
	studentId: number;
	modalBody: string;
	firstName: string;
	lastName: string;
	indexNumber: number;
	score: number;
	health: number;
}

function EditStudentInfoModal({
	context,
	id,
	innerProps,
}: ContextModalProps<EditStudentInfoModalInnerProps>) {
	const form = useForm({
		validate: zodResolver(EditStudentInfoSchema),
		initialValues: {
			firstName: innerProps.firstName,
			lastName: innerProps.lastName,
			indexNumber: innerProps.indexNumber,
			score: innerProps.score,
			health: innerProps.health,
		},
	});

	useEffect(() => {
		console.log(form.values);
	}, [form.values]);

	const {
		mutate: changeStudentInfo,
		isPending,
		isSuccess,
		isError,
	} = useUpdateStudent(innerProps.studentId!, {
		firstName: form.values.firstName,
		lastName: form.values.lastName,
		indexNumber: +form.values.indexNumber,
		score: +form.values.score,
		health: +form.values.health,
	});

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleEditStudent = () => {
		form.validate();
		changeStudentInfo();
	};

	if (isPending) {
		return (
			<Center h={120}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--good-state-color)' />
					<Text>
						Student {form.getInputProps('firstName').value}{' '}
						{form.getInputProps('lastName').value} został&nbsp;
						<Text span fw={500} c='var(--mantine-primary-color)'>
							zaktualizowany
						</Text>
						.
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);
	}

	if (isError)
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleX size='3rem' color='var(--bad-state-color)' />
					<Text>Wystąpił problem podczas aktualizowania danych studenta.</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Rozumiem
				</Button>
			</>
		);

	return (
		<form onSubmit={form.onSubmit(handleEditStudent)}>
			<Stack gap='xs'>
				<TextInput
					leftSection={<IconTag />}
					label='Imię'
					{...form.getInputProps('firstName')}
				/>
				<TextInput
					leftSection={<IconTag />}
					label='Nazwisko'
					{...form.getInputProps('lastName')}
				/>
				<NumberInput
					leftSection={<IconHash />}
					label='Numer indeksu'
					hideControls
					allowNegative={false}
					allowDecimal={false}
					minLength={6}
					maxLength={6}
					description='Zmiana numeru indeksu spowoduje aktualizację adresu e-mail studenta'
					{...form.getInputProps('indexNumber')}
				/>
				<NumberInput
					label='Wynik'
					leftSection={<IconCoins />}
					leftSectionProps={{ style: { color: 'var(--score-color)' } }}
					step={5}
					allowNegative={false}
					allowDecimal={false}
					{...form.getInputProps('score')}
				/>
				<NumberInput
					label='Życia'
					leftSection={<IconHeartFilled />}
					leftSectionProps={{ style: { color: 'var(--heart-color)' } }}
					min={0}
					max={3}
					maxLength={1}
					allowNegative={false}
					allowDecimal={false}
					{...form.getInputProps('health')}
				/>
				<Button type='submit' fullWidth mt='sm' loading={isPending}>
					{isPending ? '' : 'Zapisz'}
				</Button>
			</Stack>
		</form>
	);
}

export default EditStudentInfoModal;
