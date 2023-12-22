import { Center, Loader, Select, Stack, Text, Textarea, rem } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

function SpecialTaskDetailsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; taskId: number }>) {
	//QUERY TO GET SPECIAL TASK DETAILS

	const [isTypeMarkdown, setIsTypeMarkdown] = useState(
		// !!specialTaskInfo?.taskInfo.isMarkdown
		false
	);

	const [question, setQuestion] = useState(
		// specialTaskInfo?.taskInfo.question || ''
		''
	);

	// if get special task query is pending
	// if (isQueryPending) {
	// 	return (
	// 		<Center h={300}>
	// 			<Loader />
	// 		</Center>
	// 	);
	// }

	return (
		<Stack>
			<Text fw={500}>
				Szczegóły zadania specjalnego number&nbsp;
				<Text size='lg' span c='var(--mantine-primary-color)'>
					{/* {specialTaskInfo?.taskInfo.number} */}1
				</Text>
				&nbsp;dodanego&nbsp;
				<Text span c='var(--mantine-primary-color)'>
					{/* {dayjs(specialTaskInfo?.taskInfo.openDate).format('D/MM/YYYY HH:mm')} */}
					03/10/2000 10:11
				</Text>
			</Text>
			<Select
				allowDeselect={false}
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				// defaultValue={specialTaskInfo?.taskInfo.isMarkdown ? 'Markdown' : 'Zwykły tekst'}
				defaultValue='Markdown'
				disabled
			/>
			<Textarea
				leftSection={<IconFloatLeft />}
				leftSectionProps={{
					style: { alignItems: 'flex-start', marginTop: rem(3) },
				}}
				label='Treść'
				minRows={7}
				autosize
				maxRows={10}
				placeholder='Treść zadania...'
				// defaultValue={specialTaskInfo?.taskInfo.question}
				defaultValue='Siema fajne zadanie'
				disabled
			/>
		</Stack>
	);
}

export default SpecialTaskDetailsModal;
