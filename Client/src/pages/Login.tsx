import { useState } from 'react';
import axios from '@/utils/axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/auth/login', {
        email: username,
        password,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = () => {
    console.log('Przenosze');
    navigate('/');
  };

  const handleMe = async () => {
    const response = await axios.get('/users/me');
    console.log(response);
  };

  const handleCreateGroup = async () => {
    const response = await axios.post('/groups/createGroup', {
      name: 'Test123',
      lecturerId: 8,
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="usernameInput">Username:</label>
      <input
        type="text"
        name="usernameInput"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="passwordInput">Password:</label>
      <input
        type="text"
        name="passwordInput"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Log in</button>
      <button onClick={handleMe}>Me</button>
      <button onClick={handleCreateGroup}>Create group id:8</button>
      <br />
      <button onClick={handleRedirect}>Redirect</button>
    </div>
  );
}

export default LoginPage;
