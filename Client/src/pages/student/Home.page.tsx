import { Carousel } from '@mantine/carousel';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import { Center, Loader, Text } from '@mantine/core';
import { useGetStudentLessonsInfo } from '@/hooks/lessons/useGetStudentLessonsInfo';

export function HomePage() {
	const { data: StudentLessonsInfo, isPending } = useGetStudentLessonsInfo();

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	const slides = StudentLessonsInfo?.lessons.map(slide => {
		return (
			<Carousel.Slide key={slide.number}>
				<StudentLessonCard
					lessonId={slide.id}
					lessonNumber={slide.number}
					tasksDone={slide.tasksDone}
					tasksAmount={slide.tasksAmount}
					photoLink={slide.image}
				/>
			</Carousel.Slide>
		);
	});

	if (!slides?.length) {
		return (
			<Center h='25vh'>
				<Text>Brak lekcji</Text>
			</Center>
		);
	}

	return (
		<>
			<Center>
				<Carousel
					maw={1175}
					withIndicators
					slidesToScroll={1}
					slideSize='33.333333%'
					slideGap='sm'
					align='start'
					draggable>
					{slides}
				</Carousel>
			</Center>
		</>
	);
}
