import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import TopNavBar from './TopNavBar'; // Importing TopNavBar

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For navigation to the login page after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const requestBody = {
      name,
      phone_number: phoneNumber,
      address,
    };

    try {
      const response = await fetch('http://localhost:5000/api/customer/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("DATA:", data);

      if (response.ok) {
        // Store customer data in localStorage after successful signup
        localStorage.setItem('customer', JSON.stringify(data));

        // Update state with the success message and customer data
        setSuccessMessage(`Customer added successfully! Your ID is ${data.customerId}`);

        // Clear form fields after submission
        setName('');
        setPhoneNumber('');
        setAddress('');

        // Optionally, navigate to the login page
        setTimeout(() => {
    navigate('/login');
  }, 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right, #fbeec1, #e0c097)',
        display: 'flex',
        
        flexDirection: 'column', // To stack TopNavBar and the form
      }}
    >
      <TopNavBar /> {/* Add the TopNavBar here */}

      <Box
        sx={{
          display: 'flex',
           outline: '1px solid black',
          justifyContent: 'center',
          alignItems: 'center',
         
          flex: 1, // To make the form center vertically
        }}
      >
        <Paper elevation={5} sx={{ padding: 4, width: 400, borderRadius: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Customer Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                {successMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#a47148',
                '&:hover': { backgroundColor: '#8a5a3c' },
              }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default SignupPage;
