import StudentSpecialTaskAccordion from '@/components/StudentSpecialTaskAccordion/StudentSpecialTask.accordion';
import DataNotFound from '@/components/UI/DataNotFound';
import { AnswerReplyStatusEnum } from '@/types/Enums';
import { Box, Divider, Flex, Text, rem } from '@mantine/core';

const specialTaskMock = [
	{
		question: 'czy kotek to pies?',
		id: 1,
		solution: 'Tak',
		replyStatus: AnswerReplyStatusEnum.Enum.CORRECT,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDesc: 'Dobrze zrobione zadanie',
		replyDate: '2023-12-17T20:38:13.755Z',
		grantedScore: 100,
	},
	{
		question: 'czy kotek to pies?',
		id: 2,
		solution: 'Tak',
		replyStatus: AnswerReplyStatusEnum.Enum.PENDING,
		sendDate: '2023-12-16T20:38:13.755Z',
		replyDesc: null,
		replyDate: null,
		grantedScore: null,
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
				<StudentSpecialTaskAccordion specialTasks={pendingSpecialTaskAnswers} />
			</Box>
			<Divider w='50%' mx='auto' my='lg' />
			<Text fz={rem(34)} mx='auto'>
				Sprawdzone
			</Text>
			<Box w='50%' mx='auto' mb='xl' mt='md'>
				<StudentSpecialTaskAccordion specialTasks={evaluatedSpecialTaskAnswers} />
			</Box>
		</Flex>
	);
}

export default MySpecialTasksPage;
