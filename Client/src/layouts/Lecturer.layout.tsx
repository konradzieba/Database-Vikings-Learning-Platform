import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';
import { useLecturerStore, useUserStore } from '@/utils/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	const { userData } = useUserStore();
	const { lecturerData, groups, setGroups } = useLecturerStore();
	const lecturerNavbarData = {
		email: userData.email,
	};

	const {
		data: groupsData,
		isSuccess,
		isPending,
	} = useGetGroupsByLecturerId(lecturerData.lecturerId);

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
					{/* <pre>
						{isPending ? 'Loading...' : JSON.stringify(groups, null, 2)}
					</pre> */}
					<Outlet />
				</>
			) : (
				<FullScreenLoader />
			)}
		</>
	);
}

export default LecturerLayout;
