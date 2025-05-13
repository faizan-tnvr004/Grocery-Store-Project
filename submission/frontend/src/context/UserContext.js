import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    customerId: '1', // default or fetched from localStorage/login
    isAuthenticated: false,
  });

  // You can add login/logout/updateUser functions here
  const login = (id) => {
    setUser({ customerId: id, isAuthenticated: true });
  };

  const logout = () => {
    setUser({ customerId: null, isAuthenticated: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
