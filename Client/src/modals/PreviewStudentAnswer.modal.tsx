import {
	Box,
	Button,
	Center,
	Divider,
	Group,
	NumberInput,
	ScrollArea,
	Select,
	Text,
	Textarea,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCode, IconCoins } from '@tabler/icons-react';

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

			<Group align='flex-start'>
				<ThemeIcon variant='transparent' size='lg'>
					<IconCode />
				</ThemeIcon>
				<ScrollArea
					w='90%'
					px='md'
					offsetScrollbars
					style={{ border: `${rem(1)} solid var(--font-color)` }}
				>
					<pre style={{ wordBreak: 'break-word' }}>
						{innerProps.studentAnswer}
					</pre>
				</ScrollArea>
			</Group>

			<Divider my='md' />

			<Group justify='center' mx='md' gap='md'>
				<Select
					w='45%'
					label='Ocena zadania'
					placeholder='Ocena zadania...'
					data={['Poprawnie', 'Niepoprawne', 'Częściowo poprawne']}
				/>
				<NumberInput
					w='45%'
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
			</Group>

			<Center>
				<Textarea
					w='90%'
					my='sm'
					label='Komentarz do zadania'
					placeholder='Treść komentarza...'
					rows={5}
				/>
			</Center>

			<Group justify='center'>
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
