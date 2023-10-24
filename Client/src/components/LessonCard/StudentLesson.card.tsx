import { Button, Flex, Image, Progress, Stack, Text, rem } from '@mantine/core';
import classes from './Lesson.card.module.css';
import { useNavigate } from 'react-router-dom';

interface StudentLessonCardProps {
	lessonNumber: number;
	tasksDone: number;
	tasksAmount: number;
	photoLink: string;
}

function StudentLessonCard({ lessonNumber, tasksDone, tasksAmount, photoLink }: StudentLessonCardProps) {
	const navigate = useNavigate();
	const lessonProgress = (tasksDone / tasksAmount) * 100;
	const isLessonCompleted = tasksDone === tasksAmount;
	return (
		<Flex direction='column' miw={380} px='xs' py='xl' className={classes.lessonCardWrapper}>
			<Text ta='center' size='xl' fw={500} pb='xs' mt='md'>
				Lekcja&nbsp;{lessonNumber}
			</Text>
			<Stack gap={rem(5)} pb='md'>
				<Text ta='center' size='md'>
					Postęp
				</Text>
				<Progress.Root w='40%' size={rem(20)} mx='auto' radius='xs' pos='relative'>
					<Progress.Section value={lessonProgress}>
						<Progress.Label lts={isLessonCompleted ? 0 : rem(1)} className={classes.progressLabel}>
							<Text fw={500} size='sm'>
								{isLessonCompleted ? 'Ukończono' : `${tasksDone}/${tasksAmount}`}
							</Text>
						</Progress.Label>
					</Progress.Section>
				</Progress.Root>
			</Stack>
			<Image src={photoLink} mx='auto' w={rem(340)} h={rem(220)} alt={`Lesson number ${lessonNumber} photo`} />
			<Button maw={200} my='lg' mx='auto' onClick={() => navigate('/lesson-tasks/2')}>
				Przejdź
			</Button>
		</Flex>
	);
}

export default StudentLessonCard;
