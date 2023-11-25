import { useState } from 'react';
import {
	Button,
	Center,
	Group,
	Loader,
	Stack,
	Tabs,
	Text,
	TextInput,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconTag } from '@tabler/icons-react';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { useRegisterManyStudentsMutation } from '@/hooks/students/useRegisterManyStudentsMutation';
import RegisterStudentsFromCSVFile from '@/components/CreateGroup/RegisterStudentsFromCSVFile.component';

export interface CsvData {
	[key: string]: string;
}

function CreateGroupModal({ context, id }: ContextModalProps) {
	const [activeTab, setActiveTab] = useState<string | null>('csv');
	const [groupName, setGroupName] = useState('');
	const [groupNameError, setGroupNameError] = useState('');
	const [csvData, setCsvData] = useState<CsvData[]>([]);
	const [fileInputError, setFileInputError] = useState('');

	const { lecturerData } = useLecturerStore();

	const { mutate, isPending, isError, isSuccess } =
		useRegisterManyStudentsMutation({
			lecturerId: lecturerData.lecturerId as number,
			groupName: groupName,
			studentsToRegister: csvData.map((row) => ({
				firstName: row['Imię'],
				lastName: row['Nazwisko'],
				indexNumber: +row['Numer indeksu'],
			})),
		});

	const handleCreateGroup = () => {
		const transformedData = csvData.map((row) => ({
			firstName: row['Imię'],
			lastName: row['Nazwisko'],
			indexNumber: row['Numer indeksu'],
		}));

		if (!groupName) {
			setGroupNameError('Nazwa grupy jest wymagana');
			return;
		}

		if (csvData.length === 0) {
			setFileInputError('Plik CSV jest wymagany');
			return;
		}

		mutate();

		console.log('Przetworzone dane:', transformedData);
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<>
				<Center mih={80}>
					<Loader />
				</Center>
			</>
		);
	}

	if (isSuccess) {
		return (
			<>
				<Center mih={80}>
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
				<Center mih={80}>
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
		<Tabs value={activeTab} onChange={setActiveTab}>
			<Tabs.List>
				<Tabs.Tab value='csv' w='50%' fw={500}>
					Z pliku CSV
				</Tabs.Tab>
				<Tabs.Tab value='manual' w='50%' fw={500}>
					Ręcznie
				</Tabs.Tab>
			</Tabs.List>
			<Stack mb='xl' gap='lg' mt='xs'>
				<TextInput
					label='Nazwa grupy'
					placeholder='Nazwa grupy'
					leftSection={<IconTag size='1.4rem' />}
					error={groupNameError}
					onChange={(e) => {
						setGroupName(e.target.value);
						setGroupNameError('');
					}}
				/>
				<Tabs.Panel value='csv'>
					<RegisterStudentsFromCSVFile
						csvData={csvData}
						fileInputError={fileInputError}
						setCsvData={setCsvData}
						setFileInputError={setFileInputError}
					/>
				</Tabs.Panel>
				{/* <Tabs.Panel value='manual'></Tabs.Panel> */}
			</Stack>
			<Group justify='center'>
				<Button variant='outline' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button
					miw={150}
					onClick={handleCreateGroup}
					loading={isPending}
					disabled={!groupName || csvData.length === 0}
				>
					{isPending ? '' : 'Stwórz grupę'}
				</Button>
			</Group>
		</Tabs>
	);
}

export default CreateGroupModal;
