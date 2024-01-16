import { useAddStudentToGroupMutation } from '@/hooks/groups/useAddStudentToGroupMutation';
import {
	Button,
	Center,
	Flex,
	Loader,
	NumberInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconCircleCheck,
	IconCircleX,
	IconHash,
	IconTag,
} from '@tabler/icons-react';
import { addStudentToGroupSchema } from './AddStudentToGroup.scheme';
import { decodeDefaultPassword } from '@/utils/decodeDefaultPassword';

interface AddStudentToGroupModalProps {
	groupId: number;
}

function AddStudentToGroupModal({
	context,
	id,
	innerProps,
}: ContextModalProps<AddStudentToGroupModalProps>) {
	const form = useForm({
		validate: zodResolver(addStudentToGroupSchema),
		initialValues: {
			firstName: '',
			lastName: '',
			indexNumber: '',
		},
	});

	const {
		mutate: addStudentToGroup,
		isPending,
		isSuccess,
		isError,
	} = useAddStudentToGroupMutation({
		groupId: innerProps.groupId,
		studentData: {
			firstName: form.values.firstName,
			lastName: form.values.lastName,
			indexNumber: +form.values.indexNumber,
		},
	});

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleEditStudent = () => {
		form.validate();
		addStudentToGroup();
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
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
					<Text>
						Student&nbsp;
						<Text c='var(--mantine-primary-color)' span>
							{form.getInputProps('firstName').value}&nbsp;
							{form.getInputProps('lastName').value}
						</Text>
						&nbsp;został dodany do grupy.
					</Text>
					<Text mb='xs'>
						Domyślne hasło:&nbsp;
						<Text span fw={500}>
							{decodeDefaultPassword(
								form.getInputProps('firstName').value,
								form.getInputProps('lastName').value,
								+form.getInputProps('indexNumber').value
							)}
						</Text>
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
					<Text>Wystąpił błąd podczas dodawania studenta do grupy</Text>
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
					placeholder='Imię...'
					{...form.getInputProps('firstName')}
				/>
				<TextInput
					leftSection={<IconTag />}
					label='Nazwisko'
					placeholder='Nazwisko...'
					{...form.getInputProps('lastName')}
				/>
				<NumberInput
					leftSection={<IconHash />}
					label='Numer indeksu'
					placeholder='Numer indeksu...'
					hideControls
					allowNegative={false}
					allowDecimal={false}
					minLength={6}
					maxLength={6}
					{...form.getInputProps('indexNumber')}
				/>

				<Button type='submit' fullWidth mt='sm' loading={isPending}>
					{isPending ? '' : 'Stwórz studenta'}
				</Button>
			</Stack>
		</form>
	);
}

export default AddStudentToGroupModal;
