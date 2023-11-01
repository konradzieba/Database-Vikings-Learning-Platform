import StudentNavbar from '@/components/Navbar/Student.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useStudentStore, useUserStore } from '@/utils/store';
import { Outlet } from 'react-router-dom';

function StudentLayout() {
	const { userData } = useUserStore();
	const { studentData } = useStudentStore();
	const studentNavbarData = {
		email: userData.email,
		score: studentData.score,
		health: studentData.health,
	};

	const isLoading = !!studentNavbarData.email || !!studentNavbarData.score;

	return (
		<>
			{isLoading ? (
				<>
					<StudentNavbar studentInfo={studentNavbarData} />
					<Outlet />
				</>
			) : (
				<FullScreenLoader />
			)}
		</>
	);
}

export default StudentLayout;
