import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import TopNavBar from './TopNavBar';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    productName: '',
    stockQuantity: '',
    price: '',
    urlImage: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/product/add', {
        categoryName: formData.categoryName,
        productName: formData.productName,
        stockQuantity: parseInt(formData.stockQuantity),
        price: parseFloat(formData.price),
        urlImage: formData.urlImage
      });
      alert(response.data.message || 'Product added successfully!');
      setFormData({
        categoryName: '',
        productName: '',
        stockQuantity: '',
        price: '',
        urlImage: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <>
      <TopNavBar />
      <Container maxWidth="sm" style={{ backgroundColor: '#f9f4ef', padding: '30px', marginTop: '30px', borderRadius: '10px' }}>
        <Typography variant="h4" gutterBottom>Add New Product</Typography>
        {['categoryName', 'productName', 'stockQuantity', 'price', 'urlImage'].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field.replace(/([A-Z])/g, ' $1')}
            value={formData[field]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type={field === 'price' || field === 'stockQuantity' ? 'number' : 'text'}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>Add Product</Button>
      </Container>
    </>
  );
};

export default AddProduct;
