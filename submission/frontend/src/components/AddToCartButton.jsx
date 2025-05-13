import React from 'react';
import { Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AddToCartButton = ({ productId, quantity = 1 }) => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user?.userId) {
      navigate('/login');
      return;
    }

    addToCart(user.userId, productId, quantity);
  };

  return (
    <Button variant="contained" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
