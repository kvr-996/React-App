import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = ({ handleRegistration }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const newUser = { username, email, password };
    navigate('/login')
    fetch('http://localhost:8002/userreg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(() => {
      alert('Registered successfully!');
      setIsPending(false);
      setUsername('');
      setEmail('');
      setPassword('');
    })
    .catch(err => {
      setIsPending(false);
      console.error('Error registering user:', err);
    });
  };

  return (
    <div className="usereg">
      <h2 style={{color:"black",fontSize:"30px"}}>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label style={{color:"black",fontSize:"20px"}}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label style={{color:"black",fontSize:"20px"}}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={{color:"black",fontSize:"20px"}}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isPending && <button type="submit" style={{color:"black",fontSize:"20px"}}>Register</button>}
      </form>
    </div>
  );
};

export default UserRegistration;
