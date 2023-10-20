import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	return (
		<>
			<LecturerNavbar />
			<Outlet />
		</>
	);
}

export default LecturerLayout;
