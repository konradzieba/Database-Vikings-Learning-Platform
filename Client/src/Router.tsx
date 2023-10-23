import { Center } from '@mantine/core';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Login/Login.form';
import BlankContent from './components/UI/BlankContent';
import StudentLayout from './layouts/Student.layout';
import MyTasksPage from './pages/MyTasks.page';
import ScoreBoardPage from './pages/ScoreBoard.page';
import TaskAnswerPage from './pages/TaskAnswer.page';
import LecturerLayout from './layouts/Lecturer.layout';
import { loginMiddleware } from './utils/middlewares';
import { NotFoundPage } from './pages/404.page';
import DashboardPage from './pages/Dashboard.page';
import AuthMiddleware from './utils/Auth.middleware';
import axios from '@/utils/axios';
import { TMeResponse, TMessageResponse } from './types/ResponseTypes';
import { UserRole } from './types/Enums';

const router = createBrowserRouter([
	{
		path: '/',
		loader: async () => {
			const { data } = await axios.post<Pick<TMeResponse, 'role'>>('/auth/checkRole');
			
			if (data.role === UserRole.LECTURER || data.role === UserRole.SUPERUSER) {
				return redirect('/dashboard');
			} else {
				return null;
			}
		},
		ErrorBoundary: () => <Navigate to='/login' replace />,
		element: (
			<AuthMiddleware>
				<StudentLayout />
			</AuthMiddleware>
		),
		children: [
			{ index: true, element: <Center>STRONA GŁOWNA</Center> },
			{ path: '/score-board', element: <ScoreBoardPage /> },
			{ path: '/my-tasks', element: <MyTasksPage /> },
			{ path: '/task/:id', element: <TaskAnswerPage /> },
		],
	},
	{
		path: '/dashboard',
		loader: async () => {
			const { data } = await axios.post<Pick<TMeResponse, 'role'>>('/auth/checkRole');

			if (data.role === UserRole.LECTURER || data.role === UserRole.SUPERUSER) {
				return null;
			} else {
				return redirect('/not-found');
			}
		},
		ErrorBoundary: () => <Navigate to='/login' replace />,
		element: (
			<AuthMiddleware>
				<LecturerLayout />
			</AuthMiddleware>
		),
		children: [
			{ index: true, element: <DashboardPage /> },
			{
				path: 'group/:id',
				element: <Center>Podglad jednej grupy</Center>,
			},
		],
	},
	{
		path: '/login',
		element: <LoginForm />,
	},
	{ path: '/me', element: <BlankContent /> },
	{ path: '/not-found', element: <NotFoundPage /> },
	{ path: '*', element: <Navigate to='/not-found' replace /> },
]);

export function Router() {
	return <RouterProvider router={router} />;
}
