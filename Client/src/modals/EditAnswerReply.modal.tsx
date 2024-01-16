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
	rem,
} from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconBlockquote, IconCircleCheck, IconCoins, IconListDetails } from '@tabler/icons-react';
import { CodeHighlight } from '@mantine/code-highlight';
import { useForm, zodResolver } from '@mantine/form';
import { answerReplySchema } from './CreateAnswerReply.schema';
import { useEffect, useState } from 'react';
import { AnswerReplyStatus, AnswerReplyStatusEnum } from '@/types/Enums';
import dayjs from 'dayjs';
import { useGetEditAnswerReplyDataQuery } from '@/hooks/answer/useGetEditAnswerReplyQuery';
import { useEditAnswerReplyMutation } from '@/hooks/answer/useEditAnswerReplyMutation';

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

interface EditAnswerReplyModalProps {
	answerId: number;
	studentId: number;
	studentFullName: string;
	studentIndex: number;
}

function EditAnswerReplyModal({ context, id, innerProps }: ContextModalProps<EditAnswerReplyModalProps>) {
	const [selectError, setSelectError] = useState<string | null>(null);
	const {
		data: answerData,
		isLoading: isFetching,
		isError: isFetchingError,
	} = useGetEditAnswerReplyDataQuery(+innerProps.answerId);

	const answerReplyForm = useForm({
		initialValues: {
			replyStatus: answerData?.answerData.replyStatus as AnswerReplyStatus,
			replyDesc: answerData?.answerData.replyDesc ?? '',
			grantedScore: (answerData?.answerData.grantedScore || '') as number | string,
		},
		validate: zodResolver(answerReplySchema),
	});

	useEffect(() => {
		if (answerData) {
			answerReplyForm.setFieldValue('replyStatus', answerData.answerData.replyStatus);
			answerReplyForm.setFieldValue('replyDesc', answerData.answerData.replyDesc || '');
			answerReplyForm.setFieldValue('grantedScore', answerData.answerData.grantedScore || '');
		}
	}, [answerData]);

	const {
		mutate: editAnswerReply,
		isPending: isEditing,
		isSuccess: isEditSuccess,
		isError: isEditError,
	} = useEditAnswerReplyMutation(innerProps.answerId, {
		grantedScore: +answerReplyForm.values.grantedScore as number,
		replyStatus: answerReplyForm.values.replyStatus as AnswerReplyStatus,
		replyDesc: answerReplyForm.values.replyDesc,
	});

	if (isFetching || isEditing) {
		return (
			<Center h={120}>
				<Loader />
			</Center>
		);
	}

	if (isFetchingError || isEditError) {
		const error = isFetchingError ? 'Nie udało się pobrać danych' : 'Nie udało się skorygować odpowiedzi';
		return (
			<Center h={120}>
				<Text>{error}</Text>
			</Center>
		);
	}

	const handleReplyAnswer = () => {
		answerReplyForm.validate();
		if (answerReplyForm.values.grantedScore === '') {
			return;
		}
		if (!answerReplyForm.values.replyStatus) {
			setSelectError('Wybierz status odpowiedzi');
			return;
		}
		editAnswerReply();
	};

	const handleCloseModal = () => {
		context.closeModal(id);
		modals.closeAll();
	};

	if (isEditSuccess) {
		return (
			<>
				<Flex direction='column' align='center' gap='md' mb='md'>
					<IconCircleCheck size='3rem' color='var(--mantine-primary-color)' />
					<Text>
						Odpowiedź została skorygowana
					</Text>
				</Flex>
				<Button fullWidth onClick={handleCloseModal}>
					Zamknij
				</Button>
			</>
		);
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleReplyAnswer();
			}}>
			<Text c='dimmed' fs='italic'>
				Data przesłania:&nbsp;
				{dayjs(answerData?.answerData.sendDate).format('DD/MM/YYYY HH:mm')}
			</Text>
			<Text c='dimmed' fs='italic'>
				Data ocenienia:&nbsp;
				{dayjs(answerData?.answerData.replyDate).format('DD/MM/YYYY HH:mm')}
			</Text>
			<Divider mt={rem(5)} mb='lg' />
			<Text mb='md'>
				{innerProps.studentFullName},&nbsp;{innerProps.studentIndex}
			</Text>

			<ScrollArea.Autosize mah={250} type='auto' offsetScrollbars>
				<CodeHighlight code={answerData?.answerData.solution ?? ''} language='sql' withCopyButton={false} />
			</ScrollArea.Autosize>

			<Divider my='md' />

			<Flex justify='space-between' gap='md'>
				<Select
					leftSection={<IconListDetails />}
					w='50%'
					label='Ocena zadania'
					placeholder='Ocena zadania...'
					data={selectData.map(item => item.label)}
					value={selectData.find(item => item.value === answerReplyForm.values.replyStatus)?.label ?? ''}
					error={selectError}
					{...(answerReplyForm.getInputProps('replyStatus'),
					{
						onChange: value => {
							answerReplyForm.setFieldValue('replyStatus', selectData.find(item => item.label === value)!.value);
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
					style: { alignItems: 'flex-start', marginTop: rem(3) },
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
					Skoryguj
				</Button>
			</Group>
		</form>
	);
}

export default EditAnswerReplyModal;
