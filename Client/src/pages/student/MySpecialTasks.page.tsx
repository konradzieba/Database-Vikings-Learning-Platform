import StudentTaskAccordion from '@/components/StudentTaskAccordion/StudentTask.accordion';
import DataNotFound from '@/components/UI/DataNotFound';
import { AnswerReplyStatusEnum } from '@/types/Enums';
import { Box, Divider, Flex, Text, rem } from '@mantine/core';

const specialTaskMock = [
	{
		taskNumber: 1,
		taskQuestion: 'Czy kot to pies?',
		replyStatus: AnswerReplyStatusEnum.Enum.CORRECT,
		replyDesc: 'Dobrze zrobione zadanie',
		solution: 'Tak',
		grantedScore: 100,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDate: '2023-12-17T20:38:13.755Z',
	},
	{
		taskNumber: 2,
		taskQuestion: 'Czy kot to pies?',
		replyStatus: AnswerReplyStatusEnum.Enum.PENDING,
		replyDesc: null,
		solution: 'Tak',
		grantedScore: null,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDate: null,
	},
	{
		taskNumber: 3,
		taskQuestion: 'Czy kot to pies?',
		replyStatus: AnswerReplyStatusEnum.Enum.PARTLY_CORRECT,
		replyDesc: 'Dobrze zrobione zadanie',
		solution: 'Prawie dobrze zrobione',
		grantedScore: 50,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDate: '2023-12-17T20:38:13.755Z',
	},
	{
		taskNumber: 3,
		taskQuestion: 'Czy kot to pies?',
		replyStatus: AnswerReplyStatusEnum.Enum.PARTLY_CORRECT,
		replyDesc: 'Dobrze zrobione zadanie',
		solution: 'Prawie dobrze zrobione',
		grantedScore: 50,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDate: '2023-12-17T20:38:13.755Z',
	},
];

function MySpecialTasksPage() {
	//If student don't have any special tasks send
	if (specialTaskMock.length === 0) {
		return <DataNotFound firstLineText='Brak zadań' secondLineText='specjalnych' />;
	}

	const pendingSpecialTaskAnswers = specialTaskMock.filter(
		task => task.replyStatus === AnswerReplyStatusEnum.Enum.PENDING
	);
	const evaluatedSpecialTaskAnswers = specialTaskMock.filter(
		task => task.replyStatus !== AnswerReplyStatusEnum.Enum.PENDING
	);

	return (
		<Flex w='80%' mx='auto' direction='column'>
			<Text fz={rem(34)} mx='auto'>
				Przesłane
			</Text>
			<Box w='50%' mx='auto' mt='md'>
				<StudentTaskAccordion isExtra tasks={pendingSpecialTaskAnswers} />
			</Box>
			<Divider w='50%' mx='auto' my='lg' />
			<Text fz={rem(34)} mx='auto'>
				Sprawdzone
			</Text>
			<Box w='50%' mx='auto' mb='xl' mt='md'>
				<StudentTaskAccordion isExtra tasks={evaluatedSpecialTaskAnswers} />
			</Box>
		</Flex>
	);
}

export default MySpecialTasksPage;
