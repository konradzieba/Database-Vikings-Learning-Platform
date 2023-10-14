import axios from '@/utils/axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

function LecturerHomePage() {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post('/auth/logout');
    navigate('/login');
  };

  const userInfo = useLoaderData();
  return (
    <div>
      <h1>Lecturer Home Page</h1>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default LecturerHomePage;
