import { Carousel } from '@mantine/carousel';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import { Center, Loader, Text } from '@mantine/core';
import { useGetStudentLessonsInfo } from '@/hooks/lessons/useGetStudentLessonsInfo';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import DataNotFound from '@/components/UI/DataNotFound';

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
			<Center>
				<DataNotFound firstLineText='Brak' secondLineText='dostępnych lekcji' />
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
					nextControlIcon={<IconChevronRight />}
					previousControlIcon={<IconChevronLeft />}
					draggable>
					{slides}
				</Carousel>
			</Center>
		</>
	);
}
