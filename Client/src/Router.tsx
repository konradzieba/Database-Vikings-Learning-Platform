import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentLayout from './layouts/Student.layout';
import StudentNavbar from './components/Navbar/Student.navbar';

const router = createBrowserRouter([
	{
		path: '/',
		element: <StudentNavbar />,
	},
	{
		path: '/scoreBoard',
		element: <StudentNavbar />,
	},
	{
		path: '/my-tasks',
		element: <StudentNavbar />,
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
