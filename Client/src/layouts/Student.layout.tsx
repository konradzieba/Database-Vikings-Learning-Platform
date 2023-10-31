import StudentNavbar from '@/components/Navbar/Student.navbar';
import { HomePage } from '@/pages/Home.page';
import LessonTasksPage from '@/pages/LessonTasks.page';
import MyTasksPage from '@/pages/MyTasks.page';
import ScoreBoardPage from '@/pages/ScoreBoard.page';
import TaskAnswerPage from '@/pages/TaskAnswer.page';
// import { Outlet } from 'react-router-dom';

function StudentLayout() {
	return (
		<>
			<StudentNavbar />
			{/* <Outlet /> */}
			{/* All routes from student */}
			<HomePage />
			<ScoreBoardPage />
			<MyTasksPage />
			<LessonTasksPage />
			<TaskAnswerPage />
		</>
	);
}

export default StudentLayout;
