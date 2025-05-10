import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, fetchCartItems, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      fetchCartItems(user.userId);
    }
  }, [user?.userId, fetchCartItems]);

  const handleClearCart = () => {
    if (user?.userId) {
      clearCart(user.userId);
    }
  };

  if (!user) {
    return (
      <Box p={4}>
        <Typography variant="h6">Please log in to view your cart.</Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {!cartItems || cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.productId}>
                <ListItemText
                  primary={`Product ID: ${item.productId}`}
                  secondary={`Quantity: ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" color="error" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
