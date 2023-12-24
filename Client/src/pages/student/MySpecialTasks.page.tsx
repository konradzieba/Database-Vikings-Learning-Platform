import StudentSpecialTaskAccordion from '@/components/StudentSpecialTaskAccordion/StudentSpecialTask.accordion';
import DataNotFound from '@/components/UI/DataNotFound';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useGetStudentSpecialTaskAnswersQuery } from '@/hooks/tasks/useGetStudentSpecialTaskAnswers';
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
	const { data: SpecialTaskAnswers, isLoading } = useGetStudentSpecialTaskAnswersQuery();

	if (SpecialTaskAnswers?.studentSpecialTaskAnswers.length === 0) {
		return <DataNotFound firstLineText='Brak brak przesłanych' secondLineText='zadań specjalnych' />;
	}

	const pendingSpecialTaskAnswers = SpecialTaskAnswers?.studentSpecialTaskAnswers.filter(
		task => task.answer.replyStatus === AnswerReplyStatusEnum.Enum.PENDING
	);
	const evaluatedSpecialTaskAnswers = SpecialTaskAnswers?.studentSpecialTaskAnswers.filter(
		task => task.answer.replyStatus !== AnswerReplyStatusEnum.Enum.PENDING
	);

	return (
		<>
			{isLoading ? (
				<FullScreenLoader />
			) : (
				<Flex w='80%' mx='auto' direction='column'>
					<Text fz={rem(34)} mx='auto'>
						Przesłane
					</Text>
					<Box w='50%' mx='auto' mt='md'>
						<StudentSpecialTaskAccordion specialTasks={pendingSpecialTaskAnswers!} />
					</Box>
					{evaluatedSpecialTaskAnswers && evaluatedSpecialTaskAnswers?.length > 0 && (
						<>
							<Divider w='50%' mx='auto' my='lg' />
							<Text fz={rem(34)} mx='auto'>
								Sprawdzone
							</Text>
							<Box w='50%' mx='auto' mb='xl' mt='md'>
								<StudentSpecialTaskAccordion specialTasks={evaluatedSpecialTaskAnswers!} />
							</Box>
						</>
					)}
				</Flex>
			)}
		</>
	);
}

export default MySpecialTasksPage;
