import {
	AspectRatio,
	Button,
	Flex,
	Image,
	Progress,
	Stack,
	Text,
	rem,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Lesson.card.module.css';

interface StudentLessonCardProps {
	lessonId: number;
	lessonNumber: number;
	tasksDone: number;
	tasksAmount: number;
	photoLink: string;
}

function StudentLessonCard({
	lessonId,
	lessonNumber,
	tasksDone,
	tasksAmount,
	photoLink,
}: StudentLessonCardProps) {
	const navigate = useNavigate();
	const lessonProgress = (tasksDone / tasksAmount) * 100;
	const isLessonCompleted = tasksDone === tasksAmount;
	return (
		<Flex
			direction='column'
			miw={380}
			px='xs'
			py='xl'
			className={classes.lessonCardWrapper}
		>
			<Text ta='center' size='xl' fw={500} pb='xs' mt='md'>
				Lekcja&nbsp;{lessonNumber}
			</Text>
			<Stack gap={rem(5)} pb='md'>
				<Text ta='center' size='md'>
					Postęp
				</Text>
				{tasksAmount === 0 ? (
					<Text fw={500} size='sm' ta='center'>
						Brak zadań
					</Text>
				) : (
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
										: `${tasksDone}/${tasksAmount}`}
								</Text>
							</Progress.Label>
						</Progress.Section>
					</Progress.Root>
				)}
			</Stack>
			<AspectRatio ratio={1} mah={rem(320)}>
				<Image src={photoLink} alt={`Lesson number ${lessonNumber} photo`} />
			</AspectRatio>
			<Button
				component={Link}
				to={`/lesson-tasks/${lessonId}`}
				maw={200}
				my='lg'
				mx='auto'
			>
				Przejdź
			</Button>
		</Flex>
	);
}

export default StudentLessonCard;
