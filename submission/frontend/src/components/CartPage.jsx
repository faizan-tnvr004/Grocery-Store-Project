import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from './TopNavBar.jsx'; // Adjust the path if needed

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.customer_id) {
      fetchCartItems(userData.customer_id);
    } else {
      setError('User not logged in');
    }
  }, []);

  const fetchCartItems = async (customerId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/details?customerId=${customerId}`);
      setCartItems(res.data);
    } catch (err) {
      setError('Failed to load cart items');
      console.error(err);
    }
  };

  const handleClearCart = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.customer_id) {
      try {
        await axios.delete('http://localhost:5000/api/cart/clear', {
          data: { customerId: userData.customer_id }
        });
        setCartItems([]);
      } catch (err) {
        setError('Failed to clear cart');
        console.error(err);
      }
    }
  };

  const handlePlaceOrder = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.customer_id) {
      try {
        const response = await axios.post('http://localhost:5000/api/orders/place', {
          customer_id: userData.customer_id,
        });
        setOrderInfo(response.data);
        setCartItems([]); // Clear cart display after placing order
      } catch (err) {
        setError('Failed to place order');
        console.error(err);
      }
    }
  };

  if (error) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 400, width: '100%', border: '1px solid black' }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
              {error}
            </Typography>
            <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <TopNavBar />
      <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="#e0c097">
        <Card sx={{ maxWidth: 600, width: '100%', border: '1px solid black' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32' }}>
              Your Cart
            </Typography>

            {!cartItems || cartItems.length === 0 ? (
              <Typography variant="h6" align="center" sx={{ fontSize: '1.25rem', color: 'black' }}>
                {orderInfo ? 'Order placed successfully!' : 'Your cart is empty.'}
              </Typography>
            ) : (
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.cart_id}>
                    <ListItemText
                      primary={`Product: ${item.ProductName}`}
                      secondary={`Quantity: ${item.quantity}, Price: $${item.price}, Total: $${item.TotalSum}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {cartItems.length > 0 && (
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button variant="outlined" color="error" onClick={handleClearCart}>
                  Clear Cart
                </Button>
                <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </Box>
            )}

            {orderInfo && (
              <Box mt={4} textAlign="center">
                <Typography variant="h6" color="green" fontWeight="bold">
                  {orderInfo.message}
                </Typography>
                <Typography variant="body1">Order ID: {orderInfo.order_id}</Typography>
                <Typography variant="body1">Total Price: ${orderInfo.total_price}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CartPage;
