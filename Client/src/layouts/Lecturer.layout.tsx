import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import { useMeQuery } from '@/hooks/users/useMeQuery';
import { UserRole } from '@/types/Enums';
import { meQueryFn } from '@/utils/axios-queries';
import { useStore } from '@/utils/store';
import { useEffect } from 'react';
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
