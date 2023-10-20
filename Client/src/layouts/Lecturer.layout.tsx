import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import { UserRole } from '@/types/Enums';
import { useStore } from '@/utils/store';
import { Link, Navigate, Outlet } from 'react-router-dom';

function LecturerLayout() {
	const { role } = useStore();

	if (!role) {
		return <Navigate to='/login' replace />;
	}
	if (role === UserRole.STUDENT) {
		return <Navigate to='/not-found' replace />;
	}

	return (
		<>
			<LecturerNavbar />
			<Link to='/'>Panel studenta</Link>
			<Outlet />
		</>
	);
}

export default LecturerLayout;
