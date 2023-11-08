import { useEffect, useRef } from 'react';
import { useUpdateStudent } from '@/hooks/users/useUpdateStudent';
import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCoins, IconHeartFilled } from '@tabler/icons-react';
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
	} = useUpdateStudent(innerProps.studentId!, form.values);

	const handleEditStudent = () => {
		form.validate();
		changeStudentInfo();
	};

	return (
		<form onSubmit={form.onSubmit(handleEditStudent)}>
			<Stack gap='xs'>
				<TextInput label='Imię' {...form.getInputProps('firstName')} />
				<TextInput label='Nazwisko' {...form.getInputProps('lastName')} />
				<NumberInput
					label='Numer indeksu'
					hideControls
					allowNegative={false}
					allowDecimal={false}
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
