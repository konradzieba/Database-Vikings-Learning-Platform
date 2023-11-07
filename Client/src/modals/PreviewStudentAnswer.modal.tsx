import {
	Button,
	Divider,
	Flex,
	Group,
	NumberInput,
	ScrollArea,
	Select,
	Text,
	Textarea,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCoins } from '@tabler/icons-react';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';

interface PreviewStudentAnswerModalProps {
	studentFullName: string;
	studentIndex: number;
	studentAnswer: string;
}

function PreviewStudentAnswerModal({
	context,
	id,
	innerProps,
}: ContextModalProps<PreviewStudentAnswerModalProps>) {
	const handleEvaluateAnswer = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	return (
		<>
			<Text mb='md'>
				{innerProps.studentFullName},&nbsp;{innerProps.studentIndex}
			</Text>

			<ScrollArea h={250} type='auto' offsetScrollbars>
				<CodeHighlight
					code={innerProps.studentAnswer}
					language='sql'
					withCopyButton={false}
				/>
			</ScrollArea>

			<Divider my='md' />

			<Flex justify='space-between' gap='md'>
				<Select
					w='50%'
					label='Ocena zadania'
					placeholder='Ocena zadania...'
					data={['Poprawnie', 'Niepoprawne', 'Częściowo poprawne']}
				/>
				<NumberInput
					w='50%'
					leftSection={<IconCoins color='var(--score-color)' />}
					defaultValue={100}
					step={5}
					min={0}
					max={100}
					clampBehavior='strict'
					allowDecimal={false}
					label='Ilość punktów'
					placeholder='Ilość punktów'
				/>
			</Flex>

			<Textarea
				w='100%'
				my='sm'
				label='Komentarz do zadania'
				placeholder='Treść komentarza...'
				rows={5}
			/>

			<Group justify='center' mt='lg'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button miw={150} onClick={handleEvaluateAnswer}>
					Oceń
				</Button>
			</Group>
		</>
	);
}

export default PreviewStudentAnswerModal;
