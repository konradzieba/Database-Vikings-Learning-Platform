import { AnswerReplyStatusEnum } from '@/types/Enums';
import classes from '../StudentTaskAccordion/StudentTask.accordion.module.css';
import { Accordion, Badge, Divider, Flex, Group, Stack, Text, Textarea, ThemeIcon, rem } from '@mantine/core';
import { IconBlockquote, IconChevronDown, IconClock, IconCode, IconCoins, IconStarFilled } from '@tabler/icons-react';
import DateTimeDisplay from '../UI/DateTimeDisplay';

interface SpecialTaskInterface {
	id: number;
	solution: string;
	replyStatus: string;
	sendDate: string;
	replyDesc: string | null;
	replyDate: string | null;
	grantedScore: number | null;
	question: string;
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
		<Accordion.Item key={`${task.id}-${index}`} value={`${task.id}-${index}`}>
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
							title={`Status odpowiedzi: ${translateStatus(task.replyStatus)}`}
							size='lg'
							my='md'
							color={statusBadgeColor(task.replyStatus)}
							className={classes.accordionBadge}>
							{translateStatus(task.replyStatus)}
						</Badge>
						{task.grantedScore && (
							<Group
								title={`Przyznane punkty za odpowiedź: ${task.grantedScore}`}
								align='center'
								className={classes.grantedScore}
								gap={rem(5)}
								py={rem(3.1)}>
								<ThemeIcon variant='transparent' size={rem(24)} className={classes.grantedScore}>
									<IconCoins />
								</ThemeIcon>
								<Text size='lg' fw={500}>
									{task.grantedScore}
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
							value={task.solution}
							mt='xs'
						/>
						<DateTimeDisplay date={task.sendDate} title='Data przesłania' icon={<IconClock />} />
					</Group>
					{task.replyDesc && task.replyDate && task.replyStatus !== AnswerReplyStatusEnum.Enum.PENDING ? (
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
								placeholder={task.replyDesc}
								mt='xs'
							/>
							<DateTimeDisplay date={task.replyDate} title='Data zwrócenia' icon={<IconClock />} />
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
