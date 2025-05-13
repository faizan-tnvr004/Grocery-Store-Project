import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async (customerId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/count?customerId=${customerId}`);
      const data = await res.json();
      setCartCount(data.count || 0);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
