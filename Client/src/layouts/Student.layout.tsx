import StudentNavbar from '@/components/Navbar/Student.navbar';
import { UserRole } from '@/types/Enums';
import { useStore } from '@/utils/store';
import { Link, Navigate, Outlet } from 'react-router-dom';

function StudentLayout() {
	const { role } = useStore();

	if (!role) {
		return <Navigate to='/login' replace />;
	}
	if (role === UserRole.LECTURER || role === UserRole.SUPERUSER) {
		return <Navigate to='/not-found' replace />;
	}

	return (
		<>
			<StudentNavbar />
			<Outlet />
			<Link to={'/dashboard'}>Panel wykladowcy</Link>
		</>
	);
}

export default StudentLayout;
