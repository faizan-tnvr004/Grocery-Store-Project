import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  InputBase,
  Box
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#ffffff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '250px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + search icon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

const TopNavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a3e1a', boxShadow: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ffffff' }}>
          HF Grocery Store
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Button color="inherit" component={Link} to="/" sx={{ color: '#ffffff' }}>Home</Button>
        <Button color="inherit" component={Link} to="/categories" sx={{ color: '#ffffff' }}>Shop</Button>
        <Button color="inherit" component={Link} to="/about" sx={{ color: '#ffffff' }}>About</Button>
        <Button color="inherit" component={Link} to="/order-history" sx={{ color: '#ffffff', minWidth: 'auto', fontWeight: 'bold', fontSize: '1.1rem' }}>H</Button>
        <Button color="inherit" component={Link} to="/admin" sx={{ color: '#ffffff', minWidth: 'auto', fontWeight: 'bold', fontSize: '1.1rem' }}>A</Button>

        <IconButton color="inherit" sx={{ color: '#ffffff' }} component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton color="inherit" sx={{ color: '#ffffff' }} component={Link} to="/login">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
