import LecturerNavbar from '@/components/Navbar/Lecturer.navbar';
import CreateLessonPage from '@/pages/CreateLesson.page';
import GroupLessonsPage from '@/pages/GroupLessons.page';
import GroupPanelPage from '@/pages/GroupPanel.page';
import GroupStudentsInfoPage from '@/pages/GroupStudentsInfo.page';
import LessonDashboardPage from '@/pages/LessonDashboard.page';
// import { Outlet } from 'react-router-dom';

function LecturerLayout() {
	return (
		<>
			<LecturerNavbar />
			{/* <Outlet /> */}
			{/* All routes from lecturer */}
			<GroupPanelPage />
			<GroupLessonsPage />
			<LessonDashboardPage />
			<CreateLessonPage />
			<GroupStudentsInfoPage />
		</>
	);
}

export default LecturerLayout;
