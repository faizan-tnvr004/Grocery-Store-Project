import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
// 🟫 Import MUI theme tools
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // this is your custom theme file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <UserProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </UserProvider>
    </CartProvider>
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();

