import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TopNavBar from './TopNavBar';

const LowStock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const threshold = queryParams.get('threshold') || 10;

  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/product/low-stock?threshold=${threshold}`);
        if (response.data.success) {
          setLowStockItems(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch low stock items');
        }
      } catch (err) {
        setError('Error fetching low stock items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, [threshold]);

  if (loading) return <Typography sx={{ p: 4 }}>Loading low stock items...</Typography>;
  if (error) return <Typography sx={{ p: 4, color: 'red' }}>{error}</Typography>;

  return (
    <>
      <TopNavBar />
      <Box sx={{ p: 4, backgroundColor: '#f3e9d2', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Low Stock Items (Threshold: {threshold})
        </Typography>

        {lowStockItems.length === 0 ? (
          <Typography>No low stock items found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{  border: '1px solid black' }}>Product ID</TableCell>
                  <TableCell sx={{  border: '1px solid black' }}>Name</TableCell>
                  <TableCell sx={{  border: '1px solid black' }}>Stock Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow  sx={{  border: '1px solid black' }}key={item.product_id}>
                    <TableCell sx={{  border: '1px solid black' }}>{item.product_id}</TableCell>
                    <TableCell sx={{  border: '1px solid black' }}>{item.name}</TableCell>
                    <TableCell sx={{  border: '1px solid black' }}>{item.stock_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate('/admin')}
        >
          Back to Admin Page
        </Button>
      </Box>
    </>
  );
};

export default LowStock;
