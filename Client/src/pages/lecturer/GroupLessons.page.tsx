import { Center, Flex, Text } from '@mantine/core';
import lesson1 from '@/assets/lesson1.png';
import { Carousel } from '@mantine/carousel';
import LecturerLessonCard from '@/components/LessonCard/LecturerLesson.card';
import AddLessonCard from '@/components/LessonCard/AddLesson.card';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import {useGetLessonsByGroupId} from '@/hooks/lessons/useGetLessonsByGroupId';
import FullScreenLoader from '@/components/UI/FullScreenLoader';

function GroupLessonsPage() {
	let { id } = useParams();
	const { pathname } = useLocation();
	const { data: LessonsFromGroup, isPending } = useGetLessonsByGroupId(+id!);
	const slides = LessonsFromGroup?.lessons.map(slide => {
		return (
			<Carousel.Slide key={slide.number}>
				<LecturerLessonCard
					id={slide.id}
					lessonNumber={slide.number}
					taskAmount={slide.taskAmount}
					isFrequencyChecked={slide.isFrequencyChecked}
					photoLink={slide.image}
				/>
			</Carousel.Slide>
		);
	});

	return (
		<>
			{pathname.endsWith('/lessons') ? (
				isPending ? (
					<FullScreenLoader />
				) : slides?.length === 0 ? (
					<Center>
						<Carousel
							maw={1175}
							withIndicators
							slidesToScroll={1}
							initialSlide={1}
							slideSize='33.333333%'
							slideGap='sm'
							align='start'
							draggable>
							<Carousel.Slide>
								<AddLessonCard />
							</Carousel.Slide>
						</Carousel>
					</Center>
				) : (
					<Center>
						<Carousel
							maw={1175}
							withIndicators
							slidesToScroll={1}
							initialSlide={slides?.length! - 2}
							slideSize='33.333333%'
							slideGap='sm'
							align='start'
							draggable>
							{slides}
							<Carousel.Slide>
								<AddLessonCard />
							</Carousel.Slide>
						</Carousel>
					</Center>
				)
			) : (
				<Outlet />
			)}
		</>
	);
}

export default GroupLessonsPage;

{
	/* <>
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
						draggable>
						{slides}
						<Carousel.Slide>
							<AddLessonCard />
						</Carousel.Slide>
					</Carousel>
				</Center>
			) : (
				<Outlet />
			)}
		</> */
}
