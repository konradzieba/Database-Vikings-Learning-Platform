import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import { useUserStore } from '@/utils/stores/useUserStore';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	const { userData } = useUserStore();
	const { lecturerData, setGroups } = useLecturerStore();
	const lecturerNavbarData = {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
	};

	const { data: groupsData, isSuccess } = useGetGroupsByLecturerId(lecturerData.lecturerId);

	useEffect(() => {
		if (isSuccess) {
			setGroups(groupsData.groups);
		}
	}, [isSuccess]);

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
