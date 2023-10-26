import {
	Accordion,
	Badge,
	Box,
	Divider,
	Flex,
	Group,
	Stack,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import classes from './StudentTask.accordion.module.css';
import {
	IconBlockquote,
	IconChevronDown,
	IconCode,
	IconCoins,
} from '@tabler/icons-react';
import { AnswerReplyStatusEnum } from '@/types/Enums';

interface TaskInterface {
	taskNumber: number;
	taskQuestion: string;
	replyStatus: string;
	replyDesc: string | null;
	solution: string;
	grantedScore: number | null;
}

interface StudentTaskAccordionProps {
	tasks: TaskInterface[];
}

function StudentTaskAccordion({ tasks }: StudentTaskAccordionProps) {
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

	//key i value do zmiany
	const studentTaskAnswers = tasks.map((task, index) => (
		<Accordion.Item
			key={`${task.taskNumber}-${index}`}
			value={`${task.taskNumber}-${index}`}
		>
			<Accordion.Control>
				<Flex
					align='center'
					justify='space-evenly'
					gap='lg'
					mx='auto'
					className={classes.accordionControlWrapper}
				>
					<ThemeIcon
						size='lg'
						maw='10%'
						radius='sm'
						my='md'
						className={classes.accordionIconColor}
					>
						<Text fw={500}>{task.taskNumber}</Text>
					</ThemeIcon>

					<Text w='70%' my='md'>
						{spliceQuestion(task.taskQuestion)}
					</Text>

					<Flex direction='column' align='end'>
						<Badge
							my='md'
							color={statusBadgeColor(task.replyStatus)}
							size='lg'
							className={classes.accordionBadge}
						>
							{translateStatus(task.replyStatus)}
						</Badge>
						{task.grantedScore && (
							<Group
								className={classes.grantedScore}
								gap={rem(2)}
								py={rem(3.1)}
							>
								<ThemeIcon
									variant='transparent'
									size={rem(24)}
									className={classes.grantedScore}
								>
									<IconCoins />
								</ThemeIcon>
								<Text size='lg' fw={500}>
									{900}
								</Text>
							</Group>
						)}
					</Flex>
				</Flex>
			</Accordion.Control>
			<Accordion.Panel>
				<Divider color='#a6a6a6' />
				<Stack gap='lg' mx='auto'>
					<Group mt='sm'>
						<ThemeIcon variant='transparent' size='lg'>
							<IconCode />
						</ThemeIcon>
						<Box w='90%' px='md' className={classes.accordionSolutionContainer}>
							<pre>{task.solution}</pre>
						</Box>
					</Group>
					{task.replyDesc && task.replyStatus !== AnswerReplyStatusEnum.Enum.PENDING ? (
						<Group>
							<ThemeIcon variant='transparent' size='lg'>
								<IconBlockquote />
							</ThemeIcon>
							{task.replyDesc}
						</Group>
					) : null}
				</Stack>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<Accordion
			variant='separated'
			chevron={<IconChevronDown />}
			chevronSize={rem(24)}
			className={classes.accordionTabWrapper}
		>
			{studentTaskAnswers}
		</Accordion>
	);
}

export default StudentTaskAccordion;
