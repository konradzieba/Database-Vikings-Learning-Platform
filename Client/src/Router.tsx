import { Center } from '@mantine/core';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Login/Login.form';
import BlankContent from './components/UI/BlankContent';
import StudentLayout from './layouts/Student.layout';
import MyTasksPage from './pages/MyTasks.page';
import ScoreBoardPage from './pages/ScoreBoard.page';
import TaskAnswerPage from './pages/TaskAnswer.page';
import LecturerLayout from './layouts/Lecturer.layout';
import { NotFoundPage } from './pages/404.page';
import DashboardPage from './pages/Dashboard.page';
import AuthMiddleware from './utils/Auth.middleware';
import { lecturerLayoutLoaderFn, loginLoaderFn, studentLayoutLoaderFn } from './utils/middlewares';
import { HomePage } from './pages/Home.page';
import LessonTasksPage from './pages/LessonTasks.page';
import GroupPanelPage from './pages/GroupPanel.page';

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
			{ path: '/score-board', element: <ScoreBoardPage /> },
			{ path: '/my-tasks', element: <MyTasksPage /> },
			{ path: '/lesson-tasks/:id', element: <LessonTasksPage /> },
			{ path: '/task/:id', element: <TaskAnswerPage /> },
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
			{
				path: 'group/:id',
				element: <GroupPanelPage />,
			},
		],
	},
	{
		path: '/login',
		loader: loginLoaderFn,
		element: <LoginForm />,
	},
	{ path: '/me', element: <BlankContent /> },
	{ path: '/not-found', element: <NotFoundPage /> },
	{ path: '*', element: <Navigate to='/not-found' replace /> },
]);

export function Router() {
	return <RouterProvider router={router} />;
}
