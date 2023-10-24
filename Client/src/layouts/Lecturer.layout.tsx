import LecturerLessonCard from '@/components/LessonCard/LecturerLesson.card';
import StudentLessonCard from '@/components/LessonCard/StudentLesson.card';
import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import { Center, Text } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

function LecturerLayout() {
	return (
		<>
			<LecturerNavbar />
			<Link to='/'>Panel studenta</Link>
			<Outlet />
			<Center my='xl'>
				<Text>Lecturer Card</Text>
				<LecturerLessonCard />
				<Text>Student Card</Text>
				<StudentLessonCard />
			</Center>
		</>
	);
}

export default LecturerLayout;
