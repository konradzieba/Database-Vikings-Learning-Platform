import { Center } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import LecturerLessonCard from '@/components/LessonCard/LecturerLesson.card';
import AddLessonCard from '@/components/LessonCard/AddLesson.card';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

function GroupLessonsPage() {
	let { id } = useParams();
	const { pathname } = useLocation();
	const { data: LessonsFromGroup, isPending } = useGetLessonsByGroupId(+id!);
	const slides = LessonsFromGroup?.lessons.map((slide) => {
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
			{isPending ? (
				<FullScreenLoader />
			) : slides?.length === 0 ? (
				<Center>
					<AddLessonCard />
				</Center>
			) : (
				<Center>
					<Carousel
						maw={1175}
						withIndicators
						slidesToScroll={1}
						initialSlide={0}
						slideSize='33.333333%'
						slideGap='sm'
						align='start'
						nextControlIcon={<IconChevronRight />}
						previousControlIcon={<IconChevronLeft />}
						draggable
					>
						{slides}
						<Carousel.Slide>
							<AddLessonCard />
						</Carousel.Slide>
					</Carousel>
				</Center>
			)}
		</>
	);
}

export default GroupLessonsPage;
