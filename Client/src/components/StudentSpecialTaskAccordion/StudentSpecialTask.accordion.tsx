import { AnswerReplyStatusEnum } from '@/types/Enums';
import classes from '../StudentTaskAccordion/StudentTask.accordion.module.css';
import { Accordion, Badge, Divider, Flex, Group, Stack, Text, Textarea, ThemeIcon, rem } from '@mantine/core';
import { IconBlockquote, IconChevronDown, IconClock, IconCode, IconCoins, IconStarFilled } from '@tabler/icons-react';
import DateTimeDisplay from '../UI/DateTimeDisplay';

interface SpecialTaskInterface {
	question: string;
	answer: {
		id: number;
		solution: string;
		replyStatus: string;
		sendDate: string;
		replyDesc: string | null;
		replyDate: string | null;
		grantedScore: number | null;
	};
}

interface StudentSpecialTaskAccordionProps {
	specialTasks: SpecialTaskInterface[];
}

function StudentSpecialTaskAccordion({ specialTasks }: StudentSpecialTaskAccordionProps) {
	const spliceQuestion = (question: string) => {
		if (question.length > 251) {
			return question.substring(0, 251) + '...';
		} else {
			return question;
		}
	};

	const statusBadgeColor = (status: string) => {
		switch (status) {
			case AnswerReplyStatusEnum.Enum.CORRECT:
				return 'var(--good-state-color)';
			case AnswerReplyStatusEnum.Enum.PARTLY_CORRECT:
				return 'var(--neutral-state-color)';
			case AnswerReplyStatusEnum.Enum.INCORRECT:
				return 'var(--bad-state-color)';
			default:
				return 'var(--mantine-primary-color)';
		}
	};

	const translateStatus = (status: string) => {
		switch (status) {
			case AnswerReplyStatusEnum.Enum.CORRECT:
				return 'Poprawna';
			case AnswerReplyStatusEnum.Enum.PARTLY_CORRECT:
				return 'Częściowo poprawna';
			case AnswerReplyStatusEnum.Enum.INCORRECT:
				return 'Niepoprawna';
			default:
				return 'Oczekująca';
		}
	};

	const studentSpecialTaskAnswers = specialTasks.map((task, index) => (
		<Accordion.Item key={`${task.answer.id}-${index}`} value={`${task.answer.id}-${index}`}>
			<Accordion.Control mih={rem(120)}>
				<Flex align='center' justify='space-evenly' gap='lg' mx='sm' className={classes.accordionControlWrapper}>
					<Flex w='80%' align='center'>
						<ThemeIcon size='lg' maw='10%' radius='sm' my='md' mr='md' color='var(--special-task-color)'>
							<IconStarFilled />
						</ThemeIcon>
						<Text my='md'>{spliceQuestion(task.question)}</Text>
					</Flex>

					<Flex direction='column' align='flex-end' w='20%'>
						<Badge
							title={`Status odpowiedzi: ${translateStatus(task.answer.replyStatus)}`}
							size='lg'
							my='md'
							color={statusBadgeColor(task.answer.replyStatus)}
							className={classes.accordionBadge}>
							{translateStatus(task.answer.replyStatus)}
						</Badge>
						{task.answer.grantedScore && (
							<Group
								title={`Przyznane punkty za odpowiedź: ${task.answer.grantedScore}`}
								align='center'
								className={classes.grantedScore}
								gap={rem(5)}
								py={rem(3.1)}>
								<ThemeIcon variant='transparent' size={rem(24)} className={classes.grantedScore}>
									<IconCoins />
								</ThemeIcon>
								<Text size='lg' fw={500}>
									{task.answer.grantedScore}
								</Text>
							</Group>
						)}
					</Flex>
				</Flex>
			</Accordion.Control>
			<Accordion.Panel>
				<Divider color='#a6a6a6' />
				<Stack gap='lg' mx='auto'>
					<Group>
						<Textarea
							className='StudentTaskTextAreaOverwrite'
							style={{ flexGrow: '1' }}
							leftSectionProps={{
								style: { alignItems: 'flex-start', marginTop: '2px', color: 'var(--mantine-primary-color)' },
							}}
							rows={3}
							disabled
							leftSection={
								<ThemeIcon variant='transparent'>
									<IconCode />
								</ThemeIcon>
							}
							value={task.answer.solution}
							mt='xs'
						/>
						<DateTimeDisplay date={task.answer.sendDate} title='Data przesłania' icon={<IconClock />} />
					</Group>
					{task.answer.replyDesc && task.answer.replyDate && task.answer.replyStatus !== AnswerReplyStatusEnum.Enum.PENDING ? (
						<Group>
							<Textarea
								className='StudentTaskTextAreaOverwrite'
								style={{ flexGrow: '1' }}
								leftSectionProps={{
									style: { alignItems: 'flex-start', marginTop: '2px', color: 'var(--mantine-primary-color)' },
								}}
								rows={3}
								disabled
								leftSection={
									<ThemeIcon variant='transparent'>
										<IconBlockquote />
									</ThemeIcon>
								}
								placeholder={task.answer.replyDesc}
								mt='xs'
							/>
							<DateTimeDisplay date={task.answer.replyDate} title='Data zwrócenia' icon={<IconClock />} />
						</Group>
					) : null}
				</Stack>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<Accordion
			w='100%'
			variant='separated'
			chevron={<IconChevronDown />}
			chevronSize={rem(24)}
			className={classes.accordionTabWrapper}>
			{studentSpecialTaskAnswers}
		</Accordion>
	);
}

export default StudentSpecialTaskAccordion;
