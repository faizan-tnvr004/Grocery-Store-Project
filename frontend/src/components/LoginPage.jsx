import React, { useState } from 'react';
import { Box, TextField, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from './TopNavBar'; // Importing TopNavBar
const LoginPage = () => {
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/customer/get/${customerId}`);
      const data = res.data;

      if (data && data.length > 0) {
        localStorage.setItem('userData', JSON.stringify(data[0]));
        setUserData(data[0]);
        setError('');
      } else {
        setError('Wrong ID. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setCustomerId('');
  };

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  return (
    <>
<TopNavBar />

      <Box
        sx={{
         backgroundColor: '#e0c097',// beige
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 4,
            backgroundColor: '#ffffff',
            boxShadow: 2,
            borderRadius: 3,
            borderColor: 'black',
            outline: '1px solid black',
          }}
        >
          {!userData ? (
            <>
              <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' , borderColor: 'black'}}>
                Login
              </Typography>
              <TextField
                label="Customer ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
              {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1b5e20' },
                  mt: 2
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
                {!userData && (
            <Button 
            variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1b5e20' },
                  mt: 2
                }}
            component={Link} to="/signup" >
              Sign Up
            </Button>
          )}
            </>
          ) : (
            <>
              <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                Welcome, {userData.name}
              </Typography>
              <Typography align="center">Phone: {userData.phone_number}</Typography>
              <Typography align="center" sx={{ mb: 2 }}>Address: {userData.address}</Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  color: '#2e7d32',
                  borderColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#f1f8f1',
                    borderColor: '#1b5e20',
                  }
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
