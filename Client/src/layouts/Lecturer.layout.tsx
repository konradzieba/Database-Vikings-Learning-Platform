import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import { Link, Outlet } from 'react-router-dom';

function LecturerLayout() {

	return (
		<>
			<LecturerNavbar />
			<Link to='/'>Panel studenta</Link>
			<Outlet />
		</>
	);
}

export default LecturerLayout;
