import { CsvData } from '@/modals/CreateGroup.modal';
import {
	Button,
	Collapse,
	FileInput,
	Group,
	Popover,
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
	IconFile,
	IconInfoCircle,
	IconPencil,
	IconX,
} from '@tabler/icons-react';
import Papa, { ParseResult } from 'papaparse';
import { Dispatch, useState } from 'react';

const FileInputManual = ({
	isManualOpen,
	setManualOpen,
}: {
	isManualOpen: boolean;
	setManualOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Popover width={310} position='bottom' withArrow shadow='md' opened={isManualOpen}>
			<Popover.Target>
				<IconInfoCircle
					size='1.4rem'
					color='var(--mantine-primary-color-lighter)'
					onMouseEnter={() => setManualOpen(true)}
					onMouseLeave={() => setManualOpen(false)}
				/>
			</Popover.Target>
			<Popover.Dropdown style={{ pointerEvents: 'none' }}>
				<Text size='sm' style={{ textWrap: 'balance' }}>
					Plik CSV musi zawierać nagłówki kolumn:&nbsp;
					<Text span fw={700}>
						Imię, Nazwisko, Numer indeksu
					</Text>
					. Delimiter zostanie wykryty automatycznie. Plik musi być kodowany w UTF-8. Puste linie zostaną pominięte
					(warto sprawdzić podgląd przed tworzeniem czy wszystko zostało wczytane poprawnie). Szczególną uwagę należy
					zwrócić na pliki CSV wygenerowane z pliku XLS (Excel). W takim przypadku należy wybrać opcję Zapisz jako i
					wybrać format CSV UTF-8 (rozdzielany średnikiem) lub opcję z zakładki obok.
				</Text>
			</Popover.Dropdown>
		</Popover>
	);
};

interface RegisterStudentsFromCSVFileProps {
	csvData: CsvData[];
	fileInputError: string;
	setCsvData: Dispatch<React.SetStateAction<CsvData[]>>;
	setFileInputError: Dispatch<React.SetStateAction<string>>;
}

function RegisterStudentsFromCSVFile({
	csvData,
	fileInputError,
	setCsvData,
	setFileInputError,
}: RegisterStudentsFromCSVFileProps) {
	const [scrolled, setScrolled] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	const [isManualOpen, setManualOpen] = useState(false);
	const [editingRowIndex, setEditingRowIndex] = useState<string>('');

	const handleDeleteRow = (indexNumber: string) => {
		setCsvData(prev => prev.filter(row => row['Numer indeksu'] !== indexNumber));
	};

	const handleFileChange = (file: File | null) => {
		if (!file) return;
		Papa.parse(file, {
			header: true,
			encoding: 'UTF-8',
			skipEmptyLines: true,
			complete: (result: ParseResult<CsvData>) => {
				setCsvData(result.data);
			},
			error: () => {
				setFileInputError('Wystąpił błąd podczas przetwarzania pliku. Sprawdź czy plik jest zgodny z instrukcją.');
			},
		});
	};

	const rows = csvData.map((row, index) => {
		const isEditing = editingRowIndex === row['Numer indeksu'];
		return (
			<Table.Tr key={row['Numer indeksu']}>
				<Table.Td>{index + 1}</Table.Td>
				<Table.Td>
					{isEditing ? (
						<TextInput
							value={row['Imię']}
							onChange={e => {
								row['Imię'] = e.target.value;
								setCsvData([...csvData]);
							}}
						/>
					) : (
						row['Imię']
					)}
				</Table.Td>
				<Table.Td>
					{isEditing ? (
						<TextInput
							value={row['Nazwisko']}
							onChange={e => {
								row['Nazwisko'] = e.target.value;
								setCsvData([...csvData]);
							}}
						/>
					) : (
						row['Nazwisko']
					)}
				</Table.Td>
				<Table.Td>{row['Numer indeksu']}</Table.Td>
				<Table.Td>
					<Group gap='sm'>
						{!isEditing ? (
							<>
								<IconPencil
									size='1.4rem'
									color='var(--mantine-primary-color)'
									onClick={() => setEditingRowIndex(row['Numer indeksu'])}
									cursor='pointer'
								/>
								<IconX
									size='1.4rem'
									color='var(--bad-state-color)'
									onClick={() => handleDeleteRow(row['Numer indeksu'])}
									cursor='pointer'
								/>
							</>
						) : (
							<IconCheck
								size='1.4rem'
								color='var(--mantine-primary-color)'
								cursor='pointer'
								onClick={() => setEditingRowIndex('')}
							/>
						)}
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<>
			<FileInput
				accept='.csv'
				label='Lista studentów'
				placeholder='Kliknij, aby wybrać plik CSV'
				description='Zapoznaj się z instrukcją po prawej stronie poniższego pola'
				error={fileInputError}
				leftSection={<IconFile size='1.4rem' />}
				rightSection={<FileInputManual isManualOpen={isManualOpen} setManualOpen={setManualOpen} />}
				onChange={handleFileChange}
			/>
			{csvData.length !== 0 && (
				<Stack gap='xs'>
					<Group justify='space-between' mt={rem(2)}>
						<Text>
							Wczytano&nbsp;
							<Text span fw={500}>
								{csvData.length}
							</Text>
							&nbsp;studentów
						</Text>
					</Group>
					<Button
						variant='outline'
						leftSection={isPreviewOpen ? <IconChevronUp size='1.4rem' /> : <IconChevronDown size='1.4rem' />}
						onClick={() => {
							setIsPreviewOpen(!isPreviewOpen);
							setEditingRowIndex('');
						}}>
						{isPreviewOpen ? 'Ukryj podgląd' : 'Podgląd'}
					</Button>
				</Stack>
			)}
			{csvData.length !== 0 && (
				<Collapse in={isPreviewOpen}>
					<ScrollArea h={250} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
						<Table verticalSpacing='sm' withRowBorders striped>
							<Table.Thead className={`tableHeader ${scrolled ? 'tableScrolled' : ''}`}>
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
		</>
	);
}

export default RegisterStudentsFromCSVFile;
