import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Group,
	Loader,
	NumberInput,
	ScrollArea,
	Select,
	Text,
	Textarea,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import {
	IconBlockquote,
	IconCoins,
	IconListDetails,
} from '@tabler/icons-react';
import { CodeHighlight } from '@mantine/code-highlight';
import { useForm, zodResolver } from '@mantine/form';
import { answerReplySchema } from './PreviewStudentAnswerModal.schema';
import { useEffect, useState } from 'react';
import { AnswerReplyStatus, AnswerReplyStatusEnum } from '@/types/Enums';
import useReplyAnswerMutation from '@/hooks/answer/useReplyAnswerMutation';
import dayjs from 'dayjs';
import { set } from 'zod';

const selectData = [
	{
		value: AnswerReplyStatusEnum.Values.CORRECT,
		label: 'Poprawne',
	},
	{
		value: AnswerReplyStatusEnum.Values.PARTLY_CORRECT,
		label: 'Częściowo poprawne',
	},
	{
		value: AnswerReplyStatusEnum.Values.INCORRECT,
		label: 'Niepoprawne',
	},
];

interface PreviewStudentAnswerModalProps {
	studentFullName: string;
	studentIndex: number;
	studentAnswer: string;
	answerId: number;
}

function PreviewStudentAnswerModal({
	context,
	id,
	innerProps,
}: ContextModalProps<PreviewStudentAnswerModalProps>) {
	const [selectError, setSelectError] = useState<string | null>(null);
	const answerReplyForm = useForm({
		initialValues: {
			replyStatus: '' as AnswerReplyStatus | string,
			replyDesc: '',
			grantedScore: 100 as number | string,
		},
		validate: zodResolver(answerReplySchema),
	});

	const {
		mutate: createAnswerReply,
		isPending,
		isSuccess,
	} = useReplyAnswerMutation(innerProps.answerId, {
		replyDate: dayjs().toDate(),
		replyDesc: answerReplyForm.values.replyDesc,
		replyStatus: answerReplyForm.values.replyStatus as AnswerReplyStatus,
		grantedScore: answerReplyForm.values.grantedScore as number,
	});

	useEffect(() => {
		console.log(answerReplyForm.values);
	}, [answerReplyForm.values]);

	const handleReplyAnswer = () => {
		answerReplyForm.validate();
		if (!answerReplyForm.values.replyStatus) {
			setSelectError('Wybierz status odpowiedzi');
			return;
		}
		createAnswerReply();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isPending) {
		return (
			<Center h={120}>
				<Loader />
			</Center>
		);
	}

	if (isSuccess) {
		return (
			<Box>
				<Center h={120}>
					<Text>Odpowiedź została oceniona</Text>
				</Center>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</Box>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleReplyAnswer();
			}}
		>
			<Text mb='md'>
				{innerProps.studentFullName},&nbsp;{innerProps.studentIndex}
			</Text>

			<ScrollArea.Autosize mah={250} type='auto' offsetScrollbars>
				<CodeHighlight
					code={innerProps.studentAnswer}
					language='sql'
					withCopyButton={false}
				/>
			</ScrollArea.Autosize>

			<Divider my='md' />

			<Flex justify='space-between' gap='md'>
				<Select
					leftSection={<IconListDetails />}
					w='50%'
					label='Ocena zadania'
					placeholder='Ocena zadania...'
					data={selectData.map((item) => item.label)}
					error={selectError}
					{...(answerReplyForm.getInputProps('replyStatus'),
					{
						onChange: (value) => {
							answerReplyForm.setFieldValue(
								'replyStatus',
								selectData.find((item) => item.label === value)!.value
							);
							setSelectError(null);
						},
					})}
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
					{...answerReplyForm.getInputProps('grantedScore')}
				/>
			</Flex>

			<Textarea
				leftSection={<IconBlockquote />}
				leftSectionProps={{
					style: { alignItems: 'flex-start', marginTop: '3px' },
				}}
				w='100%'
				my='sm'
				label='Komentarz do zadania'
				placeholder='Treść komentarza...'
				rows={5}
				{...answerReplyForm.getInputProps('replyDesc')}
			/>

			<Group justify='center' mt='lg'>
				<Button miw={150} variant='outline' onClick={handleCloseModal}>
					Anuluj
				</Button>
				<Button type='submit' miw={150}>
					Oceń
				</Button>
			</Group>
		</form>
	);
}

export default PreviewStudentAnswerModal;
