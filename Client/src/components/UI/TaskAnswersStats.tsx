import { Button, Divider, Flex, Text, rem } from '@mantine/core';
import dayjs from 'dayjs';

type Answer = {
	firstName: string;
	lastName: string;
	index: number;
	answer: string;
	sendDate: string;
};

interface TaskStatsProps {
	endDate: string;
	amountOfNotAnswered: number;
	answers: Answer[];
}

function TaskAnswersStats({ endDate, answers, amountOfNotAnswered }: TaskStatsProps) {
	const answersCount = answers.length;

	return (
		<Flex gap={10} align='center' mx='lg' mt='sm'>
			<Text mx={rem(18)}>
				Odpowiedzi&nbsp;
				<Text span c='var(--mantine-primary-color)'>
					{answersCount}
				</Text>
			</Text>
			<Divider orientation='vertical' />
			<Text mx={rem(18)}>
				Nieprzesłane odpowiedzi&nbsp;
				<Text span c='var(--bad-state-color)'>
					{amountOfNotAnswered}
				</Text>
			</Text>
			<Divider orientation='vertical' />
			<Button c='var(--mantine-primary-color)' fz={rem(16)} variant='transparent' onClick={() => console.log('hejka')}>
				Szczegóły zadania
			</Button>
		</Flex>
	);
}

export default TaskAnswersStats;
