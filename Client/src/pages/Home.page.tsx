import { DateTimePicker } from '@mantine/dates';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import lesson1 from '@/assets/lesson1.png';
import dayjs from 'dayjs';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import { Center } from '@mantine/core';

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
	const slides = carouselSlides.map(slide => {
		return (
			<Carousel.Slide key={slide.lessonNumber}>
				<StudentLessonCard
					lessonNumber={slide.lessonNumber}
					tasksDone={slide.tasksDone}
					tasksAmount={slide.tasksAmount}
					photoLink={slide.photoLink}
				/>
			</Carousel.Slide>
		);
	});
	return (
		<>
			{/* <DateTimePicker
				minDate={dayjs().toDate()}
				maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
				defaultValue={dayjs().add(7, 'days').endOf('day').toDate()}
				w='30%'
			/> */}
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
