import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <-- Added import
import TopNavBar from './TopNavBar.jsx'; // Adjust the path if needed

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Assuming you are using react-router-dom for navigation

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
    <>
      <TopNavBar />
      <Box sx={{ padding: 4, textAlign: 'center' , backgroundColor: '#e0c097' }}>
        <Typography variant="h4" gutterBottom
        sx={{ fontSize: '2.5rem', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#333' }}>
          Shop by Category
        </Typography>

        <Grid container spacing={4}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={cat.category_id}
            onClick={() => {
              if (cat.category_name) {
                navigate(`/category/${cat.category_name}`);
              } else {
                console.error('Category name is missing!');
              }
            }}
            >
              <Box
                sx={{ //this is for the cards!
                  border: '1px solid #ddd',
                  borderColor: 'black',
                  borderRadius: 2,
                  padding: 2,
                  textAlign: 'center',
                  boxShadow: 1,
                  transition: 'all 0.3s ease',
                  marginLeft: 15,
                  '&:hover': {
                    cursor: 'pointer', // pointer cursor on hover
                    backgroundColor: '#c95d36',
                    transform: 'scale(1.03)',
                    color: 'white',
                    boxShadow: 3,
                  },
                }}
              >
                <img
                  src={
                    cat.image_url ||
                    'https://images.unsplash.com/photo-1506806732259-39c2d0268443' // safer fallback
                  }
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
    </>
  );
};

export default CategoryPage;
