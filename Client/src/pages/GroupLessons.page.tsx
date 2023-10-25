import { Center, Flex } from '@mantine/core';
import lesson1 from '@/assets/lesson1.png';
import { Carousel } from '@mantine/carousel';
import LecturerLessonCard from '@/components/LessonCard/LecturerLesson.card';
import AddLessonCard from '@/components/LessonCard/AddLesson.card';
import { Outlet, useLocation } from 'react-router-dom';

const carouselSlides = [
	{
		lessonNumber: 1,
		taskAmount: 13,
		isFrequencyChecked: true,
		photoLink: lesson1,
	},
	{
		lessonNumber: 2,
		taskAmount: 0,
		isFrequencyChecked: false,
		photoLink: lesson1,
	},
	{
		lessonNumber: 3,
		taskAmount: 10,
		isFrequencyChecked: true,
		photoLink: lesson1,
	},
	{
		lessonNumber: 4,
		taskAmount: 12,
		isFrequencyChecked: true,
		photoLink: lesson1,
	},
	{
		lessonNumber: 5,
		taskAmount: 4,
		isFrequencyChecked: false,
		photoLink: lesson1,
	},
];

function GroupLessonsPage() {
	const { pathname } = useLocation();
	const slides = carouselSlides.map((slide) => {
		return (
			<Carousel.Slide key={slide.lessonNumber}>
				<LecturerLessonCard
					lessonNumber={slide.lessonNumber}
					taskAmount={slide.taskAmount}
					isFrequencyChecked={slide.isFrequencyChecked}
					photoLink={slide.photoLink}
				/>
			</Carousel.Slide>
		);
	});

	return (
		<>
			{pathname.endsWith('/lessons') ? (
				<Center>
					<Carousel
						maw={1175}
						withIndicators
						slidesToScroll={1}
						initialSlide={carouselSlides.length - 2}
						slideSize='33.333333%'
						slideGap='sm'
						align='start'
						draggable
					>
						{slides}
						<Carousel.Slide>
							<AddLessonCard />
						</Carousel.Slide>
					</Carousel>
				</Center>
			) : (
				<Outlet />
			)}
		</>
	);
}

export default GroupLessonsPage;
