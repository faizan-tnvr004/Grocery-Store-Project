import React from "react";
import { Box, Typography, Container } from '@mui/material';

const App = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '10px', // Adjust padding to center content vertically
      }}
    >
      {/* Background Blur */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=1423&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 3,
          p: 5,
          zIndex: 1, // Ensure content is above the blurred background
        }}
      >
        <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold', textShadow : '2px 1px 4px rgba(0, 0, 0, 0.5)' }}>
          HF Grocery Store
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
          Freshness Delivered. Quality You Trust.
        </Typography>
      </Container>
    </Box>
  );
};

export default App;
