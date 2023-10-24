import StudentNavbar from '@/components/Navbar/Student.navbar';
import { DateTimePicker } from '@mantine/dates';
import { Link, Outlet } from 'react-router-dom';
import dayjs from 'dayjs';

function StudentLayout() {
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
