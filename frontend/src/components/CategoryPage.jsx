import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/show/categories');
        setCategories(res.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Typography>Loading categories...</Typography>;
  if (error) return <Typography>Error loading categories: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shop by Category
      </Typography>

      <Grid container spacing={4}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={cat.category_id}>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                boxShadow: 1,
                transition: 'all 0.3s ease', // Smooth transition
                '&:hover': {
                  backgroundColor: '#c95d36', // Light gray when hovered
                  transform: 'scale(1.03)',   // Slight zoom effect
                  boxShadow: 3,
                },
              }}
            >
              <img
                src={cat.image_url || 'https://unsplash.com/photos/sliced-orange-fruit-and-green-round-fruits-M_xIaxQE3Ms'}
                alt={cat.category_name}
                style={{
                  width: '200px',
                  height: '180px',
                  objectFit: 'cover',
              
                  borderRadius: 8,
                }}
              />
              <Typography variant="h6" mt={1}>
                {cat.category_name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryPage;
