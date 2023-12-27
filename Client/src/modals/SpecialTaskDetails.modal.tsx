import { useGetSpecialTaskDetailsByIdQuery } from '@/hooks/tasks/useGetSpecialTaskDetailsByIdQuery';
import { Center, Loader, Select, Stack, Text, Textarea, rem } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { IconFloatLeft, IconListDetails } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

function SpecialTaskDetailsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<{ modalBody: string; specialTaskId: number }>) {
	//QUERY TO GET SPECIAL TASK DETAILS
	const { data: specialTaskDetails, isPending } = useGetSpecialTaskDetailsByIdQuery(innerProps.specialTaskId);

	const [isTypeMarkdown, setIsTypeMarkdown] = useState(!!specialTaskDetails?.specialTask.isMarkdown);

	const [question, setQuestion] = useState(specialTaskDetails?.specialTask.question || '');

	if (isPending) {
		return (
			<Center h={300}>
				<Loader />
			</Center>
		);
	}

	return (
		<Stack>
			<Stack gap={0}>
				<Text fw={500}>
					Szczegóły zadania specjalnego &nbsp;
					<Text size='lg' span c='var(--mantine-primary-color)'>
						{specialTaskDetails?.specialTask.title}
					</Text>
				</Text>
				<Text fw={500}>
					dodanego&nbsp;
					<Text span c='var(--mantine-primary-color)'>
						{dayjs(specialTaskDetails?.specialTask.openDate).format('D/MM/YYYY HH:mm')}
					</Text>
				</Text>
			</Stack>
			<Select
				allowDeselect={false}
				leftSection={<IconListDetails />}
				label='Formatowanie tekstu'
				data={['Zwykły tekst', 'Markdown']}
				defaultValue={specialTaskDetails?.specialTask.isMarkdown ? 'Markdown' : 'Zwykły tekst'}
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
				defaultValue={specialTaskDetails?.specialTask.question}
				disabled
			/>
		</Stack>
	);
}

export default SpecialTaskDetailsModal;
