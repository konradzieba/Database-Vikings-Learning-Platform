import { CreateStudentListType } from '@/modals/CreateGroup.modal';
import {
	Button,
	Collapse,
	Group,
	InputBase,
	List,
	ScrollArea,
	Stack,
	Table,
	Text,
	TextInput,
	rem,
} from '@mantine/core';
import {
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconPencil,
	IconX,
	IconHash,
	IconTag,
} from '@tabler/icons-react';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Dispatch, SetStateAction } from 'react';

interface RegisterStudentsByOneProps {
	createdStudentsByHand: CreateStudentListType[];
	setCreatedStudentsByHand: Dispatch<SetStateAction<CreateStudentListType[]>>;
}

function RegisterStudentsByHand({
	createdStudentsByHand,
	setCreatedStudentsByHand,
}: RegisterStudentsByOneProps) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [editingRowIndex, setEditingRowIndex] = useState<number | null>();

	const [inputErrorsList, setInputErrorsList] = useState<string[]>([]);

	const [indexNumber, setIndexNumber] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');

	const handleDeleteRow = (indexNumber: number) => {
		setCreatedStudentsByHand((prev) =>
			prev.filter((row) => row['indexNumber'] !== indexNumber)
		);
	};

	const handleAddStudentCredentials = () => {
		const isValid = handleValidateInputs();

		if (isValid) {
			setCreatedStudentsByHand((prevState) => [
				...prevState,
				{ indexNumber: +indexNumber, firstName: firstName, lastName: lastName },
			]);

			setIndexNumber('');
			setFirstName('');
			setLastName('');
		}
	};

	const handleValidateInputs = () => {
		const inputErrorsListFn = [];

		createdStudentsByHand.map((student) => {
			if (student.indexNumber === +indexNumber) {
				inputErrorsListFn.push('Numer indeksu już istnieje.');
			}
		});

		if (!indexNumber || indexNumber.length !== 6) {
			inputErrorsListFn.push('Numer indeksu musi mieć 6 cyfr');
		}

		if (/\d/.test(firstName)) {
			inputErrorsListFn.push('Imię nie może zawierać liczb.');
		}

		if (!firstName || firstName.length < 3) {
			inputErrorsListFn.push('Imię jest za krótkie.');
		}

		if (/\d/.test(lastName)) {
			inputErrorsListFn.push('Nazwisko nie może zawierać liczb.');
		}

		if (!lastName || lastName.length < 3) {
			inputErrorsListFn.push('Niepoprawne nazwisko');
		}

		setInputErrorsList(inputErrorsListFn);

		return inputErrorsListFn.length === 0;
	};

	const rows = createdStudentsByHand.map((row, index) => {
		const isEditing = editingRowIndex === row['indexNumber'];
		return (
			<Table.Tr key={row['indexNumber']}>
				<Table.Td>{index + 1}</Table.Td>
				<Table.Td>
					{isEditing ? (
						<TextInput
							value={row['firstName']}
							onChange={(e) => {
								row['firstName'] = e.target.value;
								setCreatedStudentsByHand([...createdStudentsByHand]);
							}}
						/>
					) : (
						row['firstName']
					)}
				</Table.Td>
				<Table.Td>
					{isEditing ? (
						<TextInput
							value={row['lastName']}
							onChange={(e) => {
								row['lastName'] = e.target.value;
								setCreatedStudentsByHand([...createdStudentsByHand]);
							}}
						/>
					) : (
						row['lastName']
					)}
				</Table.Td>
				<Table.Td>{row['indexNumber']}</Table.Td>
				<Table.Td>
					<Group gap='sm'>
						{!isEditing ? (
							<>
								<IconPencil
									size='1.4rem'
									color='var(--mantine-primary-color)'
									onClick={() => setEditingRowIndex(row['indexNumber'])}
									cursor='pointer'
								/>
								<IconX
									size='1.4rem'
									color='var(--bad-state-color)'
									onClick={() => handleDeleteRow(row['indexNumber'])}
									cursor='pointer'
								/>
							</>
						) : (
							<IconCheck
								size='1.4rem'
								color='var(--mantine-primary-color)'
								cursor='pointer'
								onClick={() => setEditingRowIndex(null)}
							/>
						)}
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Stack>
			<Text fz={rem(14)}>Dodaj studenta lub kilku studentów ręcznie</Text>
			<Group>
				<TextInput
					leftSection={<IconTag />}
					label='Imię'
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
				/>
				<TextInput
					leftSection={<IconTag />}
					label='Nazwisko'
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>
				<InputBase
					leftSection={<IconHash />}
					label='Numer indeksu'
					value={indexNumber}
					onChange={(event) => setIndexNumber(event.currentTarget.value)}
					component={IMaskInput}
					mask='000000'
				/>
				<Button
					onClick={handleAddStudentCredentials}
					style={{ alignSelf: 'flex-end' }}
				>
					Dodaj
				</Button>
			</Group>
			<List fz={rem(14)} c='red' fs='italic'>
				{inputErrorsList.length > 0 &&
					inputErrorsList.map((error, index) => {
						return <List.Item key={index}>{error}</List.Item>;
					})}
			</List>
			{createdStudentsByHand.length !== 0 && (
				<>
					<Text>
						Ilość dodanych studentów:&nbsp;{createdStudentsByHand.length}
					</Text>
					<Button
						variant='outline'
						leftSection={
							isPreviewOpen ? (
								<IconChevronUp size='1.4rem' />
							) : (
								<IconChevronDown size='1.4rem' />
							)
						}
						onClick={() => {
							setIsPreviewOpen(!isPreviewOpen);
							setEditingRowIndex(null);
						}}
					>
						{isPreviewOpen ? 'Ukryj podgląd' : 'Podgląd'}
					</Button>
				</>
			)}
			{createdStudentsByHand.length !== 0 && (
				<Collapse in={isPreviewOpen}>
					<ScrollArea
						h={190}
						onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
					>
						<Table verticalSpacing='sm' withRowBorders striped>
							<Table.Thead
								className={`tableHeader ${scrolled ? 'tableScrolled' : ''}`}
							>
								<Table.Tr>
									<Table.Th>Lp.</Table.Th>
									<Table.Th>Imię</Table.Th>
									<Table.Th>Nazwisko</Table.Th>
									<Table.Th>Numer indeksu</Table.Th>
									<Table.Th>Akcje</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</ScrollArea>
				</Collapse>
			)}
		</Stack>
	);
}

export default RegisterStudentsByHand;
