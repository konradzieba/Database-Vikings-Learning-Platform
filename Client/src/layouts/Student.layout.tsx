import { useEffect } from 'react';
import StudentNavbar from '@/components/Navbar/Student.navbar';
import FullScreenLoader from '@/components/UI/FullScreenLoader';
import { modals } from '@mantine/modals';
import { Outlet } from 'react-router-dom';
import { useGetStudentDefaultPasswordState } from '@/hooks/students/useGetStudentDefaultPasswordState';
import { useUserStore } from '@/utils/stores/useUserStore';
import { useStudentStore } from '@/utils/stores/useStudentStore';

function StudentLayout() {
	const { userData } = useUserStore();
	const { studentData } = useStudentStore();
	const studentNavbarData = {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		score: studentData.score,
		health: studentData.health,
	};

	const isLoading = !!studentNavbarData.email || !!studentNavbarData.score;

	const { data: isPasswordChangedData, isSuccess } = useGetStudentDefaultPasswordState();

	useEffect(() => {
		if (isSuccess) {
			if (!isPasswordChangedData.isDefaultPasswordChanged) {
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
	}, [isSuccess]);

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
