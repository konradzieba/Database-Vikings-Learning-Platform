import { useEffect } from 'react';
import StudentNavbar from '@/components/Navbar/Student.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { useStudentStore, useUserStore } from '@/utils/store';
import { modals } from '@mantine/modals';
import { Outlet } from 'react-router-dom';

function StudentLayout() {
	const { userData } = useUserStore();
	const { studentData } = useStudentStore();
	const studentNavbarData = {
		email: userData.email,
		score: studentData.score,
		health: studentData.health,
		isPasswordChanged: studentData.isPasswordChanged,
	};

	const isLoading = !!studentNavbarData.email || !!studentNavbarData.score;

	useEffect(() => {
		if (studentNavbarData.isPasswordChanged !== null) {
			if (studentNavbarData.isPasswordChanged === false) {
				modals.openContextModal({
					modal: 'changeDefaultPassword',
					title: 'Zmień domyślne hasło',
					size: 'md',
					closeOnClickOutside: false,
					closeOnEscape: false,
					withCloseButton: false,
					innerProps: {
						modalBody:
							'Twoje aktualne hasło jest hasłem domyślnym wygenerowanym automatycznie, aby korzystać z aplikacji wymagana jest jego zmiana.',
					},
				});
			}
		}
	}, [studentNavbarData]);

	return (
		<>
			{isLoading ? (
				<>
					<StudentNavbar studentInfo={studentNavbarData} />
					<Outlet />
				</>
			) : (
				<FullScreenLoader />
			)}
		</>
	);
}

export default StudentLayout;
