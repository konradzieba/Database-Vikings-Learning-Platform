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
	ThemeIcon,
	rem,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconFileTypeCsv, IconKeyboard, IconTag } from '@tabler/icons-react';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { useRegisterManyStudentsMutation } from '@/hooks/students/useRegisterManyStudentsMutation';
import RegisterStudentsFromCSVFile from '@/components/CreateGroup/RegisterStudentsFromCSVFile.component';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import RegisterStudentsByHand from '@/components/CreateGroup/RegisterStudentsByHand.component';

export interface CsvData {
	[key: string]: string;
}

export type CreateStudentListType = {
	indexNumber: number;
	firstName: string;
	lastName: string;
};

function CreateGroupModal({ context, id }: ContextModalProps) {
	const [activeTab, setActiveTab] = useState<string | null>('csv');
	const [groupName, setGroupName] = useState('');
	const [groupNameError, setGroupNameError] = useState('');
	const [csvData, setCsvData] = useState<CsvData[]>([]);
	const [fileInputError, setFileInputError] = useState('');

	// created student list by hand
	const [createdStudentsByHand, setCreatedStudentsByHand] = useState<
		CreateStudentListType[]
	>([]);

	const { lecturerData } = useLecturerStore();
	const { refetch: refetchGroupsData } = useGetGroupsByLecturerId(
		lecturerData.lecturerId
	);

	const {
		mutate: registerStudentsFromCSVFile,
		isPending: isRegisterFromCSVPending,
		isError: isRegisterFromCSVError,
		isSuccess: isRegisterFromCSVSuccess,
	} = useRegisterManyStudentsMutation({
		lecturerId: lecturerData.lecturerId as number,
		groupName: groupName,
		studentsToRegister: csvData.map((row) => ({
			firstName: row['Imię'],
			lastName: row['Nazwisko'],
			indexNumber: +row['Numer indeksu'],
		})),
	});
	const {
		mutate: registerStudentsByHand,
		isPending: isRegisterByHandPending,
		isError: isRegisterByHandError,
		isSuccess: isRegisterByHandSuccess,
	} = useRegisterManyStudentsMutation({
		lecturerId: lecturerData.lecturerId as number,
		groupName: groupName,
		studentsToRegister: createdStudentsByHand,
	});

	const isPending =
		isRegisterFromCSVPending || isRegisterByHandPending ? true : false;
	const isError =
		isRegisterFromCSVError || isRegisterByHandError ? true : false;
	const isSuccess = isRegisterFromCSVSuccess || isRegisterByHandSuccess;
	const isCreateButtonDisabled =
		activeTab === 'csv'
			? !groupName || csvData.length === 0
			: !groupName || createdStudentsByHand.length === 0;

	const handleCreateGroup = () => {
		if (activeTab === 'csv') {
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

			registerStudentsFromCSVFile();

			console.log('Przetworzone dane:', transformedData);
		} else {
			if (!groupName) {
				setGroupNameError('Nazwa grupy jest wymagana');
				return;
			}

			if (createdStudentsByHand.length === 0) {
				setGroupNameError('Wymagany jest przynajmniej jeden student');
				return;
			}

			registerStudentsByHand();
			console.log('Przetworzone dane:', createdStudentsByHand);
		}
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
		refetchGroupsData();
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
				<Tabs.Tab
					value='csv'
					w='50%'
					c={activeTab === 'csv' ? 'var(--mantine-primary-color)' : undefined}
					leftSection={<IconFileTypeCsv />}
				>
					<Text c='var(--font-color)' fw={500} fz='sm'>
						Z pliku CSV
					</Text>
				</Tabs.Tab>
				<Tabs.Tab
					value='manual'
					w='50%'
					c={
						activeTab === 'manual' ? 'var(--mantine-primary-color)' : undefined
					}
					leftSection={<IconKeyboard />}
				>
					<Text c='var(--font-color)' fw={500} fz='sm'>
						Ręcznie
					</Text>
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
				<Tabs.Panel value='manual'>
					<RegisterStudentsByHand
						createdStudentsByHand={createdStudentsByHand}
						setCreatedStudentsByHand={setCreatedStudentsByHand}
					/>
				</Tabs.Panel>
			</Stack>
			<Group justify='center'>
				<Button variant='outline' miw={150} onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button
					miw={150}
					onClick={handleCreateGroup}
					loading={isPending}
					disabled={isCreateButtonDisabled}
				>
					{isPending ? '' : 'Stwórz grupę'}
				</Button>
			</Group>
		</Tabs>
	);
}

export default CreateGroupModal;
