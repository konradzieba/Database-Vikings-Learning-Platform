import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useUserStore } from '@/utils/stores/useUserStore';
import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	const { userData } = useUserStore();
	const lecturerNavbarData = {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
	};

	const isLoading = !!lecturerNavbarData.email;

	return (
		<div className='layoutWrapper'>
			{isLoading ? (
				<>
					<LecturerNavbar lecturerInfo={lecturerNavbarData} />
					<Outlet />
				</>
			) : (
				<FullScreenLoader />
			)}
		</div>
	);
}

export default LecturerLayout;
