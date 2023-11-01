import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useUserStore } from '@/utils/store';
import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	const { userData } = useUserStore();
	const lecturerNavbarData = {
		email: userData.email,
	};
	const isLoading = !!lecturerNavbarData.email;

	return (
		<>
			{isLoading ? (
				<>
					<LecturerNavbar lecturerInfo={lecturerNavbarData} />
					<Outlet />
				</>
			) : (
				<FullScreenLoader />
			)}
		</>
	);
}

export default LecturerLayout;
