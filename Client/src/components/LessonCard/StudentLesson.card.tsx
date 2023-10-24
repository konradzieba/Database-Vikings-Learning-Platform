import { Button, Flex, Image, Progress, Stack, Text, rem } from '@mantine/core';
import lesson1 from '../../assets/lesson1.png';
import classes from './Lesson.card.module.css';

const mockLessonData = {
	lessonNumber: 1,
	tasksDone: 9,
	tasksAmount: 10,
	photoLink: lesson1,
};

function StudentLessonCard() {
	const lessonProgress =
		(mockLessonData.tasksDone / mockLessonData.tasksAmount) * 100;
	const isLessonCompleted =
		mockLessonData.tasksDone === mockLessonData.tasksAmount;
	return (
		<Flex
			direction='column'
			miw={380}
			px='xs'
			py='xl'
			className={classes.lessonCardWrapper}
		>
			<Text ta='center' size='xl' fw={500} pb='xs' mt='md'>
				Lekcja&nbsp;{mockLessonData.lessonNumber}
			</Text>
			<Stack gap={rem(5)} pb='md'>
				<Text ta='center' size='md'>
					Postęp
				</Text>
				<Progress.Root
					w='40%'
					size={rem(20)}
					mx='auto'
					radius='xs'
					pos='relative'
				>
					<Progress.Section value={lessonProgress}>
						<Progress.Label
							lts={isLessonCompleted ? 0 : rem(1)}
							className={classes.progressLabel}
						>
							<Text fw={500} size='sm'>
								{isLessonCompleted
									? 'Ukończono'
									: `${mockLessonData.tasksDone}/${mockLessonData.tasksAmount}`}
							</Text>
						</Progress.Label>
					</Progress.Section>
				</Progress.Root>
			</Stack>
			<Image
				src={mockLessonData.photoLink}
				mx='auto'
				w={rem(340)}
				h={rem(220)}
				alt={`Lesson number ${mockLessonData.lessonNumber} photo`}
			/>
			<Button maw={200} my='lg' mx='auto'>
				Przejdź
			</Button>
		</Flex>
	);
}

export default StudentLessonCard;
