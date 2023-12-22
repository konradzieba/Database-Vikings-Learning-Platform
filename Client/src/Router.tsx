import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import LoginForm from './components/Login/Login.form';
import BlankContent from './components/UI/BlankContent';
import StudentLayout from './layouts/Student.layout';
import MyTasksPage from './pages/student/MyTasks.page';
import ScoreBoardPage from './pages/student/ScoreBoard.page';
import TaskAnswerPage from './pages/student/TaskAnswer.page';
import LecturerLayout from './layouts/Lecturer.layout';
import { NotFoundPage } from './pages/404.page';
import DashboardPage from './pages/lecturer/Dashboard.page';
import AuthMiddleware from './utils/Auth.middleware';
import {
	lecturerLayoutLoaderFn,
	loginLoaderFn,
	studentLayoutLoaderFn,
} from './utils/middlewares';
import { HomePage } from './pages/student/Home.page';
import LessonTasksPage from './pages/student/LessonTasks.page';
import GroupPanelPage from './pages/lecturer/GroupPanel.page';
import GroupLessonsPage from './pages/lecturer/GroupLessons.page';
import CreateLessonPage from './pages/lecturer/CreateLesson.page';
import CheckFrequencyPage from './pages/lecturer/CheckFrequency.page';
import GroupStudentsInfoPage from './pages/lecturer/GroupStudentsInfo.page';
import LessonDashboardPage from './pages/lecturer/LessonDashboard.page';
import GroupScoreBoardLecturerPage from './pages/lecturer/GroupScoreBoardLecturer.page';
import GlobalScoreBoardLecturerPage from './pages/lecturer/GlobalScoreBoardsLecturer.page';
import SpecialTaskAnswerPage from './pages/student/SpecialTaskAnswer.page';
import MySpecialTasksPage from './pages/student/MySpecialTasks.page';
import SpecialTaskDashboardPage from './pages/lecturer/SpecialTaskDashboard.page';
import StudentPreview from './pages/lecturer/StudentPreview.page';
import ProfileDetailsPage from './pages/student/ProfileDetails.page';

const router = createBrowserRouter([
	{
		path: '/',
		loader: studentLayoutLoaderFn,
		ErrorBoundary: () => <Navigate to='/login' replace />,
		element: (
			<AuthMiddleware>
				<StudentLayout />
			</AuthMiddleware>
		),
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'score-board', element: <ScoreBoardPage /> },
			{ path: 'my-tasks', element: <MyTasksPage /> },
			{ path: 'lesson-tasks/:id', element: <LessonTasksPage /> },
			{ path: 'task/:lessonId/:taskId', element: <TaskAnswerPage /> },
			{ path: 'details', element: <ProfileDetailsPage /> },
			{ path: 'special-task/:taskId', element: <SpecialTaskAnswerPage /> },
			{ path: 'my-special-tasks', element: <MySpecialTasksPage /> },
			{ path: 'me', element: <BlankContent /> },
		],
	},
	{
		path: '/dashboard',
		loader: lecturerLayoutLoaderFn,
		element: (
			<AuthMiddleware>
				<LecturerLayout />
			</AuthMiddleware>
		),
		children: [
			{ index: true, element: <DashboardPage /> },
			{ path: 'student-preview/:studentId', element: <StudentPreview /> },
			{ path: 'score-board', element: <GlobalScoreBoardLecturerPage /> },
			{ path: 'me', element: <BlankContent /> },
			{ path: 'special-tasks', element: <SpecialTaskDashboardPage /> },
			{
				path: 'group',
				element: <GroupPanelPage />,
				children: [
					{
						path: ':id',
						children: [
							{
								index: true,
								element: <GroupLessonsPage />,
							},
							{
								path: 'lesson-dashboard/:lessonId',
								element: <LessonDashboardPage />,
							},
							{ path: 'create-lesson', element: <CreateLessonPage /> },
							{
								path: 'students',
								element: <GroupStudentsInfoPage />,
							},
							{
								path: 'check-frequency/:lessonId',
								element: <CheckFrequencyPage />,
							},
							{
								path: 'score-board',
								element: <GroupScoreBoardLecturerPage />,
							},
						],
					},
				],
			},
		],
	},
	{
		path: '/login',
		loader: loginLoaderFn,
		element: <LoginForm />,
	},
	{ path: '/not-found', element: <NotFoundPage /> },
	{ path: '*', element: <Navigate to='/not-found' replace /> },
]);

export function Router() {
	return <RouterProvider router={router} />;
}
