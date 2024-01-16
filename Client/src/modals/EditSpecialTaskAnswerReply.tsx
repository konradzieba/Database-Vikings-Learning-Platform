import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps, modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { answerReplySchema } from './CreateAnswerReply.schema';
import { useGetEditSpecialTaskAnswerReplyDataQuery } from '@/hooks/answer/useGetEditSpecialTaskAnswerReplyDataQuery';
import { AnswerReplyStatus, AnswerReplyStatusEnum } from '@/types/Enums';
import { useEditSpecialTaskAnswerReplyMutation } from '@/hooks/answer/useEditSpecialTaskAnswerReplyMutation';
import { Box, Button, Center, Divider, Flex, Group, Loader, NumberInput, ScrollArea, Select, Text, Textarea, rem } from '@mantine/core';
import dayjs from 'dayjs';
import { CodeHighlight } from '@mantine/code-highlight';
import { IconBlockquote, IconCircleCheck, IconCoins, IconListDetails } from '@tabler/icons-react';

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

interface EditSpecialTaskAnswerReplyModalProps {
	answerId: number;
	studentId: number;
	studentFullName: string;
	studentIndex: number;
}

function EditSpecialTaskAnswerReplyModal({
	context,
	id,
	innerProps,
}: ContextModalProps<EditSpecialTaskAnswerReplyModalProps>) {
	const [selectError, setSelectError] = useState<string | null>(null);
	const {
		data: specialTaskAnswerData,
		isLoading: isFetching,
		isError: isFetchingError,
	} = useGetEditSpecialTaskAnswerReplyDataQuery(+innerProps.answerId);

	const specialTaskAnswerReplyForm = useForm({
		initialValues: {
			replyStatus: specialTaskAnswerData?.answerData.replyStatus as AnswerReplyStatus,
			replyDesc: specialTaskAnswerData?.answerData.replyDesc ?? '',
			grantedScore: (specialTaskAnswerData?.answerData.grantedScore || '') as number | string,
		},
		validate: zodResolver(answerReplySchema),
	});

	useEffect(() => {
		if (specialTaskAnswerData) {
			specialTaskAnswerReplyForm.setFieldValue('replyStatus', specialTaskAnswerData.answerData.replyStatus);
			specialTaskAnswerReplyForm.setFieldValue('replyDesc', specialTaskAnswerData.answerData.replyDesc || '');
			specialTaskAnswerReplyForm.setFieldValue('grantedScore', specialTaskAnswerData.answerData.grantedScore || '');
		}
	}, [specialTaskAnswerData]);

  const {
    mutate: editSpecialTaskAnswerReply,
    isPending: isEditing,
    isSuccess: isEditSuccess,
    isError: isEditError,
  } = useEditSpecialTaskAnswerReplyMutation(innerProps.answerId, {
    grantedScore: +specialTaskAnswerReplyForm.values.grantedScore as number,
    replyStatus: specialTaskAnswerReplyForm.values.replyStatus as AnswerReplyStatus,
    replyDesc: specialTaskAnswerReplyForm.values.replyDesc
  })

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
		specialTaskAnswerReplyForm.validate();
		if (specialTaskAnswerReplyForm.values.grantedScore === '') {
			return;
		}
		if (!specialTaskAnswerReplyForm.values.replyStatus) {
			setSelectError('Wybierz status odpowiedzi');
			return;
		}
		editSpecialTaskAnswerReply();
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
				{dayjs(specialTaskAnswerData?.answerData.sendDate).format('DD/MM/YYYY HH:mm')}
			</Text>
			<Text c='dimmed' fs='italic'>
				Data ocenienia:&nbsp;
				{dayjs(specialTaskAnswerData?.answerData.replyDate).format('DD/MM/YYYY HH:mm')}
			</Text>
			<Divider mt={rem(5)} mb='lg' />
			<Text mb='md'>
				{innerProps.studentFullName},&nbsp;{innerProps.studentIndex}
			</Text>

			<ScrollArea.Autosize mah={250} type='auto' offsetScrollbars>
				<CodeHighlight code={specialTaskAnswerData?.answerData.solution ?? ''} language='sql' withCopyButton={false} />
			</ScrollArea.Autosize>

			<Divider my='md' />

			<Flex justify='space-between' gap='md'>
				<Select
					leftSection={<IconListDetails />}
					w='50%'
					label='Ocena zadania'
					placeholder='Ocena zadania...'
					data={selectData.map(item => item.label)}
					value={selectData.find(item => item.value === specialTaskAnswerReplyForm.values.replyStatus)?.label ?? ''}
					error={selectError}
					{...(specialTaskAnswerReplyForm.getInputProps('replyStatus'),
					{
						onChange: value => {
							specialTaskAnswerReplyForm.setFieldValue('replyStatus', selectData.find(item => item.label === value)!.value);
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
					{...specialTaskAnswerReplyForm.getInputProps('grantedScore')}
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
				{...specialTaskAnswerReplyForm.getInputProps('replyDesc')}
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

export default EditSpecialTaskAnswerReplyModal;
