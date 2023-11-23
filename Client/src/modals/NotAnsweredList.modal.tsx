import { Center, ScrollArea, Table, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { useState } from 'react';
import classes from './NotAnsweredList.modal.module.css';

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
	const [scrolled, setScrolled] = useState(false);
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

	if (!notAnsweredList.length) {
		return (
			<Center h='25vh'>
				<Text size='lg'>Wszyscy studenci przesłali odpowiedzi</Text>
			</Center>
		);
	}

	return (
		<>
			<ScrollArea
				h={300}
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
			>
				<Table verticalSpacing='sm' withRowBorders striped>
					<Table.Thead
						className={`tableHeader ${scrolled ? 'tableScrolled' : ''}`}
					>
						<Table.Tr>
							<Table.Th>Imię</Table.Th>
							<Table.Th>Nazwisko</Table.Th>
							<Table.Th>Numer indeksu</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
}

export default NotAnsweredListModal;
