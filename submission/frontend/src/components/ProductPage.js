import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for routing to specific product
import TopNavBar from './TopNavBar.jsx'; // Adjust the path if needed

const ProductPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate to specific product page

  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to fetch products based on the category
        const response = await axios.get(`http://localhost:5000/api/show/category/${category}`);
        setProducts(response.data);
        console.log (response.data);
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <>
    
      <TopNavBar />
      <Box sx={{ padding: 4 ,  backgroundColor: '#e0c097', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom
        sx={{ fontSize: '2.5rem', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
          {category} Products
        </Typography>

        {/* Display Products */}
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                <Box
                  onClick={() => navigate(`/product/${product.product_id}`)} // Navigate to product detail page
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    borderColor: 'black',
                    padding: 2,
                    textAlign: 'center',
                    boxShadow: 1,
                    transition: 'all 0.3s ease',
                    marginLeft: 15,
                    cursor: 'pointer', // Make mouse pointer change
                    '&:hover': {
                      backgroundColor: '#c95d36',
                      transform: 'scale(1.03)',
                      boxShadow: 3,
                      color: 'white',
                    },
                  }}
                >
                  <img
                    src={product.image_url }
                    alt={product.name}
                    style={{
                      width: '200px',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <Typography variant="h6" mt={1}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${product.price}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No products available in this category.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ProductPage;
