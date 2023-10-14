import PageNotFound from '@/pages/404';
import LoginPage from '@/pages/Login';
import LecturerHomePage from '@/pages/lecturer/Home';
import StudentHomePage from '@/pages/student/Home';
import axios from '@/utils/axios';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentHomePage />,
    loader: async () => {
      try {
        return await axios.get('/users/me');
      } catch {
        return redirect('/login');
      }
    },
  },
  {
    path: '/dashboard',
    element: <LecturerHomePage />,
    loader: async () => {
      try {
        return await axios.get('/users/me');
      } catch {
        return redirect('/login');
      }
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
