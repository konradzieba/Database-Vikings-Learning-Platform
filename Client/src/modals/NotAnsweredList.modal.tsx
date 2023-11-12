import { Button, Center, Flex, ScrollArea, Table, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

interface NotAnsweredListModalProps {
	notAnsweredList: {
		User: {
			firstName: string;
			lastName: string;
		};
		indexNumber: number;
	}[];
}

function NotAnsweredListModal({
	context,
	id,
	innerProps,
}: ContextModalProps<NotAnsweredListModalProps>) {
	const { notAnsweredList } = innerProps;

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const rows = notAnsweredList.map((student) => {
		return (
			<Table.Tr key={student.indexNumber}>
				<Table.Td>{student.User.firstName}</Table.Td>
				<Table.Td>{student.User.lastName}</Table.Td>
				<Table.Td>{student.indexNumber}</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<>
			<ScrollArea offsetScrollbars='y'>
				<Table verticalSpacing='sm' withRowBorders striped withTableBorder>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Imię</Table.Th>
							<Table.Th>Nazwisko</Table.Th>
							<Table.Th>Numer indeksu</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
			<Center mt='lg'>
				<Button onClick={handleCloseModal}>Zamknij</Button>
			</Center>
		</>
	);
}

export default NotAnsweredListModal;
