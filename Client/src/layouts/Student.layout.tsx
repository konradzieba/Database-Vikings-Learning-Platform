import StudentNavbar from '@/components/Navbar/Student.navbar';
import { DateTimePicker } from '@mantine/dates';
import { UserRole } from '@/types/Enums';
import { useStore } from '@/utils/store';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';

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

			<DateTimePicker w='30%' />
			<Link to='/dashboard'>Panel wykladowcy</Link>
			<Link to='/task/4'>Przejdź do Task4</Link>
		</>
	);
}

export default StudentLayout;
