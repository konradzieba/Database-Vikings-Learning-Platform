import StudentNavbar from '@/components/Navbar/Student.navbar';
import { DateTimePicker } from '@mantine/dates';
import { useStore } from '@/utils/store';
import { Link, Navigate, Outlet } from 'react-router-dom';
import dayjs from 'dayjs';

function StudentLayout() {
	// 	const { role } = useStore();

	// if (!role) {
	// 	return <Navigate to='/login' replace />;
	// }
	// if (role === UserRole.LECTURER || role === UserRole.SUPERUSER) {
	// 	return <Navigate to='/not-found' replace />;
	// }

	return (
		<>
			<StudentNavbar />
			<Outlet />

			<DateTimePicker
				minDate={dayjs().toDate()}
				maxDate={dayjs().add(5, 'month').endOf('month').toDate()}
				defaultValue={dayjs().add(7, 'days').endOf('day').toDate()}
				w='30%'
			/>
			<Link to='/dashboard'>Panel wykładowcy</Link>
			<Link to='/task/4'>Przejdź do Task4</Link>
		</>
	);
}

export default StudentLayout;
