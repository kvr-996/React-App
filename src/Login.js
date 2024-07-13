import React, { useState } from 'react';
import userData from './usereg.json';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const users = userData.userreg;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      login();
      navigate('/')
      alert('Login successful');
    } else {
      alert('Invalid username or password. Try again.');
    }

    setIsPending(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login">
      <h2 style={{color:"black",fontSize:"30px"}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{color:"black",fontSize:"20px"}}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label style={{color:"black",fontSize:"20px"}}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isPending && <button type="submit"style={{color:"black",fontSize:"20px"}}>Login</button>}
        {isPending && <button disabled>Logging in...</button>}
      </form>
    </div>
  );
};

export default Login;
