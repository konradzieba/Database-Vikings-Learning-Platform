import { Dispatch, useRef, useState } from 'react';
import {
	Box,
	Button,
	Center,
	Collapse,
	FileInput,
	Group,
	Loader,
	Popover,
	ScrollArea,
	Stack,
	Table,
	Text,
	TextInput,
	rem,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconChevronDown,
	IconChevronUp,
	IconFile,
	IconInfoCircle,
	IconTag,
} from '@tabler/icons-react';
import Papa, { ParseResult } from 'papaparse';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { useRegisterManyStudentsMutation } from '@/hooks/students/useRegisterManyStudentsMutation';

interface CsvData {
	[key: string]: string;
}

const FileInputManual = ({
	isManualOpen,
	setManualOpen,
}: {
	isManualOpen: boolean;
	setManualOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Popover
			width={310}
			position='bottom'
			withArrow
			shadow='md'
			opened={isManualOpen}
		>
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
					. Delimiter zostanie wykryty automatycznie. Plik musi być kodowany w
					UTF-8. Puste linie zostaną pominięte (warto sprawdzić podgląd przed
					tworzeniem czy wszystko zostało wczytane poprawnie). Sczególną uwagę
					należy zwrócić na pliki CSV wygenerowane z pliku XLS (Excel). W takim
					przypadku należy wybrać opcję Zapisz jako i wybrać format CSV UTF-8
					(rozdzielany średnikiem) lub opcję z zakładki obok.
				</Text>
			</Popover.Dropdown>
		</Popover>
	);
};

function CreateGroupModal({ context, id }: ContextModalProps) {
	const [csvData, setCsvData] = useState<CsvData[]>([]);
	const [scrolled, setScrolled] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [groupNameError, setGroupNameError] = useState('');
	const [fileInputError, setFileInputError] = useState('');
	const [isManualOpen, setManualOpen] = useState(false);
	const { lecturerData } = useLecturerStore();

	const groupNameRef = useRef<HTMLInputElement>(null);

	const { mutate, isPending, isError, isSuccess } =
		useRegisterManyStudentsMutation({
			lecturerId: lecturerData.lecturerId as number,
			groupName: groupNameRef.current?.value as string,
			studentsToRegister: csvData.map((row) => ({
				firstName: row['Imię'],
				lastName: row['Nazwisko'],
				indexNumber: +row['Numer indeksu'],
			})),
		});

	const rows = csvData.map((row, index) => {
		return (
			<Table.Tr key={row['Numer indeksu']}>
				<Table.Td>{index + 1}</Table.Td>
				<Table.Td>{row['Imię']}</Table.Td>
				<Table.Td>{row['Nazwisko']}</Table.Td>
				<Table.Td>{row['Numer indeksu']}</Table.Td>
			</Table.Tr>
		);
	});

	const handleCreateGroup = () => {
		const transformedData = csvData.map((row) => ({
			firstName: row['Imię'],
			lastName: row['Nazwisko'],
			indexNumber: row['Numer indeksu'],
		}));

		if (!groupNameRef.current?.value) {
			setGroupNameError('Nazwa grupy jest wymagana');
			return;
		}

		if (csvData.length === 0) {
			setFileInputError('Plik CSV jest wymagany');
			return;
		}

		mutate();

		console.log('Przetworzone dane:', transformedData);

		context.closeModal(id);
		modals.closeAll();
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
				setFileInputError(
					'Wystąpił błąd podczas przetwarzania pliku. Sprawdź czy plik jest zgodny z instrukcją.'
				);
			},
		});
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<>
				<Center h={120}>
					<Loader />
				</Center>
			</>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Center h={120}>
					<Text>Pomyślnie dodano studentów</Text>
				</Center>
				<Group justify='center'>
					<Button variant='outline' miw={150} onClick={handleCloseModal}>
						Zamknij
					</Button>
				</Group>
			</>
		);
	}

	if (isError) {
		return (
			<>
				<Center h={120}>
					<Text>Błąd podczas dodawania studentów</Text>
				</Center>
				<Group justify='center'>
					<Button variant='outline' miw={150} onClick={handleCloseModal}>
						Zamknij
					</Button>
				</Group>
			</>
		);
	}

	return (
		<>
			<Stack mb='xl' gap='lg'>
				<TextInput
					label='Nazwa grupy'
					placeholder='Nazwa grupy'
					leftSection={<IconTag size='1.4rem' />}
					error={groupNameError}
					onChange={() => setGroupNameError('')}
					ref={groupNameRef}
				/>
				<FileInput
					clearable
					accept='.csv'
					label='Lista studentów'
					placeholder='Kliknij, aby wybrać plik CSV'
					description='Zapoznaj się z instrukcją po prawej stronie poniższego pola'
					error={fileInputError}
					leftSection={<IconFile size='1.4rem' />}
					rightSection={
						<FileInputManual
							isManualOpen={isManualOpen}
							setManualOpen={setManualOpen}
						/>
					}
					onChange={handleFileChange}
				/>
				{csvData.length !== 0 && (
					<Stack gap='xs'>
						<Text>
							Wczytano&nbsp;
							<Text span fw={500}>
								{csvData.length}
							</Text>
							&nbsp;studentów
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
							onClick={() => setIsPreviewOpen(!isPreviewOpen)}
						>
							{isPreviewOpen ? 'Ukryj podgląd' : 'Podgląd'}
						</Button>
					</Stack>
				)}
				<Collapse in={isPreviewOpen}>
					<ScrollArea
						h={250}
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
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</ScrollArea>
				</Collapse>
			</Stack>
			<Group justify='center'>
				<Button variant='outline' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleCreateGroup} loading={isPending}>
					{isPending ? '' : 'Stwórz grupę'}
				</Button>
			</Group>
		</>
	);
}

export default CreateGroupModal;
