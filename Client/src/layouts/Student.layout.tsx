import StudentNavbar from '@/components/Navbar/Student.navbar';
import { useStudentStore } from '@/utils/store';
import { Center, Loader } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function StudentLayout() {
	const { studentData } = useStudentStore();
	const studentNavbarData = {
		email: studentData.email,
		score: studentData.score,
		health: studentData.health,
	};

	const isLoading = studentData.email ? false : true;

	return (
		<>
			{studentData.email ? (
				<>
					<StudentNavbar studentInfo={studentNavbarData} />
					<Outlet />
				</>
			) : (
				<Center h='85vh'>
					<Loader size='lg' />
				</Center>
			)}
		</>
	);
}

export default StudentLayout;
