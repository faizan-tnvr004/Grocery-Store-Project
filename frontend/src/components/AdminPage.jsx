import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopNavBar from './TopNavBar';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [productIdToDelete, setProductIdToDelete] = useState('');
  const [ThresholdTocheck, SetThresholdTocheck] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
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

      alert(response.data.message);

      const updatedOrders = await axios.get('http://localhost:5000/api/orders/all');
      setOrders(updatedOrders.data.data);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  const handleDeleteProduct = async () => {
    if (!productIdToDelete) {
      alert('Please enter a product ID to delete.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/product/delete/${productIdToDelete}`);
      alert(response.data.message || 'Product deleted successfully');
      setProductIdToDelete('');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div>
      <TopNavBar />
      <div style={{ padding: '20px', backgroundColor: '#f3e9d2' }}>
        <h1>Admin Page</h1>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/addProduct')}
          style={{ marginBottom: '50px', marginRight: '10px' }}
        >
          Add New Product
        </Button>

        <div style={{ marginBottom: '40px' }}>
          <TextField
            label="Product ID to Delete"
            type="number"
            value={productIdToDelete}
            onChange={(e) => setProductIdToDelete(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button onClick={handleDeleteProduct} variant="contained" color="error" size='large'>
            Delete Product
          </Button>
        </div>

   <div style={{ marginBottom: '40px' }}>
          <TextField
            label="Low Stock Threshold"
            type="number"
            value={ThresholdTocheck}
            onChange={(e) => SetThresholdTocheck(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button 
          onClick={() => navigate(`/low-stock?threshold=${ThresholdTocheck}`)}
    variant="contained"
    color="warning"
    size="large">
            Get Low Stock
          </Button>
        </div>



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
          <Button onClick={handleStatusUpdate} variant="contained" size = 'large'>
            Update Status
          </Button>
        </div>

        <h2>All Orders</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>

              <TableCell sx={{  border: '1px solid black' }}>Order ID</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Order Date</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Total Price</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Delivery Status</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Customer Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell sx={{ border: '1px solid black' }}>{order.order_id}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    {new Date(order.order_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>${order.total_price.toFixed(2)}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{order.delivery_status}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{order.customer_name}</TableCell>
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
