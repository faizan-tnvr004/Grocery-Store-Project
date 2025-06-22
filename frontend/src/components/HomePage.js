import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import TopNavBar from "../components/TopNavBar"; // ✅ Adjust the path if needed

const HomePage = () => {
  return (
    <>
      {/* Top Navigation */}
      <TopNavBar />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,rgb(202, 120, 53) 0%, #fff 100%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 10 },
          py: 5,
          flexWrap: 'wrap',
        }}
      >
        {/* Left Text Side */}
        <Box sx={{ flex: '1 1 50%', pr: { xs: 0, md: 5 } }}>
          <Typography variant="h3" sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#2e7d23',
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            SuperMarket For Fresh Grocery
          </Typography>
          <Typography variant="h6" sx={{
            color: '#424242',
            mb: 3,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            Introduce a new model for online grocery shopping and convenient home delivery.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2e7d32',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
              fontSize: '1rem',
              px: 4,
              py: 1.5
            }}
            component={Link}
            to="categories"
          >
            Shop Now
          </Button>
        </Box>

        {/* Right Image Side */}
        <Box sx={{
          flex: '1 1 40%',
          textAlign: 'center',
          mt: { xs: 4, md: 0 }
        }}>
          <img
            src="https://img.freepik.com/free-photo/stylish-adult-woman-shopping-supermarket_23-2148625016.jpg"
            alt="Fresh groceries"
            style={{
              maxWidth: '100%',
              borderRadius: '10px',
              maxHeight: '500px',
              objectFit: 'cover',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
