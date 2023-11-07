import { Carousel } from '@mantine/carousel';
import lesson1 from '@/assets/lesson1.png';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import { Center, Loader, Text } from '@mantine/core';
import { useGetStudentLessonsInfo } from '@/hooks/lessons/useGetStudentLessonsInfo';
import FullScreenLoader from '@/components/UI/FullScreenLoader';

const carouselSlides = [
	{
		lessonNumber: 1,
		tasksDone: 9,
		tasksAmount: 10,
		photoLink: lesson1,
	},
	{
		lessonNumber: 2,
		tasksDone: 2,
		tasksAmount: 15,
		photoLink: lesson1,
	},
	{
		lessonNumber: 3,
		tasksDone: 11,
		tasksAmount: 13,
		photoLink: lesson1,
	},
	{
		lessonNumber: 4,
		tasksDone: 1,
		tasksAmount: 15,
		photoLink: lesson1,
	},
	{
		lessonNumber: 5,
		tasksDone: 0,
		tasksAmount: 12,
		photoLink: lesson1,
	},
];

export function HomePage() {
	const { data: StudentLessonsInfo, isPending } = useGetStudentLessonsInfo();

	if (isPending) {
		return (
			<Center h='25vh'>
				<Loader />
			</Center>
		);
	}

	const slides = StudentLessonsInfo?.lessons.map((slide) => {
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
					draggable
				>
					{slides}
				</Carousel>
			</Center>
		</>
	);
}
