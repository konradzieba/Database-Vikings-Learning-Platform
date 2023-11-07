import { Button, Divider, Flex, Group, Text, rem } from '@mantine/core';
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

function TaskAnswersStats({
	endDate,
	answers,
	amountOfNotAnswered,
}: TaskStatsProps) {
	const answersCount = answers.length;

	return (
		<Flex gap={10} justify='space-between' align='center' mx='lg' mt='sm'>
			<Text ml='xs' fw='bold'>
				Odpowiedzi:&nbsp;
				<Text fw={700} span c='var(--good-state-color)'>
					{answersCount || 'Brak'}
				</Text>
			</Text>
			<Group gap='sm'>
				<Button
					size='xs'
					c='var(--font-color)'
					variant='outline'
					onClick={() => console.log('hejka')}
				>
					<Text fz='md' fw='inherit'>
						Nieprzesłane&nbsp;
						<Text
							span
							fw={700}
							lts={rem(1)}
							c={
								amountOfNotAnswered
									? 'var(--bad-state-color)'
									: 'var(--good-state-color)'
							}
						>
							{`(${amountOfNotAnswered})`}
						</Text>
					</Text>
				</Button>
				<Button
					size='xs'
					c='var(--font-color)'
					fz='md'
					variant='outline'
					onClick={() => console.log('hejka')}
				>
					Szczegóły zadania
				</Button>
			</Group>
		</Flex>
	);
}

export default TaskAnswersStats;
