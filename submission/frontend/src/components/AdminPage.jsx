import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TopNavBar from './TopNavBar'; // Assuming TopNavBar component is in the same directory

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Fetch all orders from the API when the page loads
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/orders/status', {
        order_id: orderId,
        new_status: newStatus,
      });

      // Show success message
      alert(response.data.message);

      // Refresh orders after updating status
      const updatedOrders = await axios.get('http://localhost:5000/api/orders/all');
      setOrders(updatedOrders.data.data);
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  return (
    <div>
      <TopNavBar />
      <div style={{ padding: '20px', backgroundColor: '#e0c097' }}>
        <h1>Admin Page</h1>

        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Order ID"
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button onClick={handleStatusUpdate} variant="contained">Update Status</Button>
        </div>

        <h2>All Orders</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Delivery Status</TableCell>
                <TableCell>Customer Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total_price.toFixed(2)}</TableCell>
                  <TableCell>{order.delivery_status}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminPage;
