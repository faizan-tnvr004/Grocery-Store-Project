import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    // In real app, call backend and get user info.
    const mockUser = {
      userId: username === 'admin' ? '1' : '2', // mock logic
      name: username,
    };
    login(mockUser);
    navigate('/'); // go to homepage
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginPage;
