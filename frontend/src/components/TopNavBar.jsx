import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopNavBar = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#1a3e1a',
      boxShadow: 1 
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ 
          flexGrow: 1, 
          fontWeight: 'bold', 
          color: '#ffffff'
        }}>
          HF Grocery Store
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ color: '#ffffff' }}>Home</Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/categories" 
          sx={{ color: '#ffffff' }}
        >
          Shop
        </Button>
        <Button 
           color="inherit"
           component={Link}
           to="/about"
           sx={{ color: '#ffffff' }}
        >
            About
            
        </Button>
        
        <IconButton color="inherit" sx={{ color: '#ffffff' }}>
          <SearchIcon />
        </IconButton>
        <IconButton 
          color="inherit" 
          sx={{ color: '#ffffff' }}
          component={Link}
          to="/cart"
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton 
          color="inherit" 
          sx={{ color: '#ffffff' }}
          component={Link}
          to="/account"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
