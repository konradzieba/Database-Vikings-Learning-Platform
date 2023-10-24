import StudentNavbar from '@/components/Navbar/Student.navbar';
import { DateTimePicker } from '@mantine/dates';
import { Carousel } from '@mantine/carousel';
import { Link, Outlet } from 'react-router-dom';
import lesson1 from '@/assets/lesson1.png';
import dayjs from 'dayjs';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import { Box, Center, Flex, Text } from '@mantine/core';

const carouselSlides = [
	{
		lessonNumber: 1,
		tasksDone: 9,
		tasksAmount: 10,
		photoLink: lesson1,
	},
	{
		lessonNumber: 2,
		tasksDone: 11,
		tasksAmount: 10,
		photoLink: lesson1,
	},
	{
		lessonNumber: 3,
		tasksDone: 11,
		tasksAmount: 10,
		photoLink: lesson1,
	},
	{
		lessonNumber: 4,
		tasksDone: 9,
		tasksAmount: 10,
		photoLink: lesson1,
	},
	{
		lessonNumber: 5,
		tasksDone: 9,
		tasksAmount: 10,
		photoLink: lesson1,
	},
];

function StudentLayout() {
	const slides = carouselSlides.map((slide) => {
		return (
			<Carousel.Slide key={slide.lessonNumber}>
				<StudentLessonCard />
			</Carousel.Slide>
		);
	});
	return (
		<>
			<StudentNavbar />
			<Outlet />

			<DateTimePicker
				minDate={dayjs().toDate()}
				maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
				defaultValue={dayjs().add(7, 'days').endOf('day').toDate()}
				w='30%'
			/>
			<Link to='/dashboard'>Panel wykładowcy</Link>
			<Link to='/task/4'>Przejdź do Task4</Link>
			<Carousel
				maw={1200}
				withIndicators
				slidesToScroll={1}
				slideSize='33%'
				slideGap='md'
				align='start'
				draggable
			>
				{slides}
			</Carousel>
		</>
	);
}

export default StudentLayout;
