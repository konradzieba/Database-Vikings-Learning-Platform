import { Button, Divider, Flex, Group, Tabs, Text, rem } from '@mantine/core';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

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
	const [searchParams, setSearchParams] = useSearchParams();
	const answersCount = answers.length;

	return (
		<Flex gap={10} justify='space-between' align='center' mx='lg' mt='sm'>
			{/* <Text ml='xs' fw='bold'>
				Odpowiedzi:&nbsp;
				<Text fw={700} span c='var(--good-state-color)'>
					{answersCount || 'Brak'}
				</Text>
			</Text> */}
			<Tabs miw={450} defaultValue='notReplied'>
				<Tabs.List grow>
					<Tabs.Tab
						value='notReplied'
						onClick={() => setSearchParams(undefined)}
					>
						<Text fz='md' fw={500}>
							Do sprawdzenia
						</Text>
					</Tabs.Tab>
					<Tabs.Tab
						value='replied'
						onClick={() => setSearchParams({ status: 'replied' })}
					>
						<Text fz='md' fw={500}>
							Sprawdzone
						</Text>
					</Tabs.Tab>
				</Tabs.List>
				{/* <Tabs.Panel></Tabs.Panel> */}
			</Tabs>
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
