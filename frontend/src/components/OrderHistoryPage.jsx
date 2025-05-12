import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import TopNavbar from './TopNavBar'; // Import the TopNavbar component


const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem('userData'));
  const customerId = userData?.customer_id;

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`/api/orders/history?customer_id=${customerId}`);
        setOrders(response.data.data || []);
      } catch (err) {
        console.error('Order history fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [customerId]);

  if (loading && orders.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column">
        <CircularProgress />
        <Typography mt={2}>Fetching your orders...</Typography>
      </Box>
    );
  }

  if (!customerId) {
    return (
        <Box>
            <TopNavbar /> {/* Include TopNavbar at the top of the page */}

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5" color="text.secondary">
          You are not logged in.
        </Typography>
        <Typography variant="body1" mt={2}>
          Please log in to view your order history.
        </Typography>
      </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
        <TopNavbar /> {/* Include TopNavbar at the top of the page */}

    <Box sx={{ maxWidth: '1000px', mx: 'auto', my: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        Your Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography align="center" mt={4}>
          You have no orders yet. <br />
          Start shopping and we’ll show your order history here!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.order_id}>
              <Card variant="outlined" sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.order_id}
                  </Typography>
                  <Typography>
                    Date: {new Date(order.order_date).toLocaleDateString() || 'N/A'}
                  </Typography>
                  <Typography>
                    Total Price: ${order.total_price.toFixed(2)}
                  </Typography>
                  <Typography color={order.delivery_status === 'Delivered' ? 'green' : 'orange'}>
                    Delivery Status: {order.delivery_status}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Items:
                  </Typography>
                  {order.items.map((item, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        • {item.product_name} — {item.quantity} × ${item.subtotal}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      </Box>
    </Box>
  );
};

export default OrderHistoryPage;