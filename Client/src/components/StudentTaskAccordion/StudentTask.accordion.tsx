import { Accordion, Badge, Box, Center, Code, Divider, Flex, Group, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import classes from './StudentTask.accordion.module.css';
import { IconBlockquote, IconChevronDown, IconCode } from '@tabler/icons-react';

const mockData = [
	{
		taskNumber: 12,
		taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget.`,
		//Te wartości pochodzą z tabeli Answer więc trzeba będzie w get odwoływać się do TASK i ANSWER
		replyStatus: 'PENDING',
		replyDesc: 'Super zadanie',
		solution: `SELECT * FROM DB;
SELECT * FROM DB WHERE STUDENT > 1;`,
		grantedScore: 100,
	},
	{
		taskNumber: 13,
		taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been torem Ipsum is ng and typesetting i `,
		//Te wartości pochodzą z tabeli Answer więc trzeba będzie w get odwoływać się do TASK i ANSWER
		replyStatus: 'PENDING',
		replyDesc: 'Super zadanie 123',
		solution: 'SELECT * FROM DB; 123',
		grantedScore: 99,
	},
];

function StudentTaskAccordion() {
	const spliceQuestion = (question: string) => {
		if (question.length > 251) {
			return question.substring(0, 251) + '...';
		} else {
			return question;
		}
	};

	//key i value do zmiany
	const studentTaskAnswers = mockData.map(data => (
		<Accordion.Item key={data.taskNumber} value={data.solution}>
			<Accordion.Control>
				<Flex align='center' justify='space-evenly' gap='lg' mx='auto' className={classes.accordionControlWrapper}>
					<ThemeIcon size='lg' maw='10%'  radius='sm' my='md' className={classes.accordionIconColor}>
						<Text fw={500}>{data.taskNumber}</Text>
					</ThemeIcon>

					<Text w='70%' my='md'>
						{spliceQuestion(data.taskQuestion)}
					</Text>

					<Badge my='md' color='var(--mantine-primary-color)' size='lg' className={classes.accordionBadge}>
						{data.replyStatus}
					</Badge>
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
							<pre>{data.solution}</pre>
						</Box>
					</Group>
					<Group>
						<ThemeIcon variant='transparent' size='lg'>
							<IconBlockquote />
						</ThemeIcon>
						{data.replyDesc}
					</Group>
				</Stack>
			</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<Accordion
			variant='separated'
			chevron={<IconChevronDown />}
			chevronSize={rem(24)}
			className={classes.accordionTabWrapper}>
			{studentTaskAnswers}
		</Accordion>
	);
}

export default StudentTaskAccordion;
