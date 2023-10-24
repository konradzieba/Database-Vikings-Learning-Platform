import StudentNavbar from '@/components/Navbar/Student.navbar';
import { Outlet } from 'react-router-dom';

function StudentLayout() {
	return (
		<>
			<StudentNavbar />
			<Outlet />
		</>
	);
}

export default StudentLayout;
