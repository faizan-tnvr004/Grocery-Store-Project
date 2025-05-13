import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TopNavBar from './TopNavBar.jsx'; // Reuse nav bar

const SpecificProductPage = () => {
  const { productId } = useParams(); // get product ID from the URL
  const [product, setProduct] = useState(null); // store fetched product
  const [loading, setLoading] = useState(true); // loading state
  const [quantity, setQuantity] = useState(1); // quantity for cart
  const [error, setError] = useState(null); // error state

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/retrieve/${productId}`);
        setProduct(res.data[0]); // update state with product data
      
       
      } catch (err) {
        setError('Failed to load product.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    console.log("Updated product:", product);
  }, [product]);

  // Increase quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev < product.stock_quantity ? prev + 1 : prev);
  };

  // Decrease quantity but not below 1
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Placeholder for add-to-cart logic
 const handleAddToCart = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const customerId = userData?.customer_id;

    if (!customerId) {
      alert('Please log in to add items to your cart.');
      return;
    }

    // Prepare the cart item with correct field names
    const cartItem = {
      customerId: customerId,   // Use 'customerId' (not 'customer_id')
      productId: product.product_id,   // Use 'productId' (not 'product_id')
      quantity: quantity,   // 'quantity' stays the same
    };

    console.log("Sending to /cart/add:", cartItem); // Debug log

    // Make the POST request to add to cart
    const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);

    if (response.data.success) {
      alert(`Added ${quantity} of "${product.name}" to your cart.`);
    } else {
      alert(response.data.message || 'Something went wrong.');
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response) {
      console.error("Backend says:", error.response.data);
      alert(error.response.data.message || 'Failed to add to cart.');
    } else {
      alert('Failed to add item to cart.');
    }
  }
};



  if (loading) return <Typography>Loading product...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <>
       
      <TopNavBar />
      <Box sx={{ padding: 4, display: 'flex', gap: 4  , backgroundColor: '#e0c097', height: '100vh' }}>
        {/* Product Image */}
        <img
          src={product.image_url }
          alt={product.name}
          style={{
            width: '300px',
            height: '250px',
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />

        {/* Product Details */}
        <Box>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>ID: {product.product_id}</Typography>
          <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>
          <Typography variant="h6" color="primary">Price: ${product.price}</Typography>

          {/* Quantity and Add to Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
            {/* Minus button */}
            <IconButton 
              onClick={handleDecrease} 
              sx={{ cursor: 'pointer' }} 
              color="primary"
            >
              <RemoveIcon />
            </IconButton>

            <Typography>{quantity}</Typography>

            {/* Plus button */}
            <IconButton 
              onClick={handleIncrease} 
              sx={{ cursor: 'pointer' }} 
              color="primary"
            >
              <AddIcon />
            </IconButton>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="success"
              onClick={handleAddToCart}
              sx={{ ml: 2, cursor: 'pointer' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SpecificProductPage;
