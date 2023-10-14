import axios from '@/utils/axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

function StudentHomePage() {
  const userInfo = useLoaderData();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  if (
    userInfo?.data?.role === 'LECTURER' ||
    userInfo?.data?.role === 'SUPERUSER'
  ) {
    navigate('/dashboard');
  }
  return (
    <div>
      <h1>Student Home Page</h1>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default StudentHomePage;
