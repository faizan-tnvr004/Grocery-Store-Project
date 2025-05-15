import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage'; // Assuming you have a file that exports categories
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';
import SpecificProductPage from './components/SpecificProductPage'; // Assuming you have a file that exports specific product page
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import OrderHistoryPage from './components/OrderHistoryPage';  // Import the new page
import AdminPage from './components/AdminPage';
import AddProduct  from './components/AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Fixed component name */}
        <Route path="/category/:category" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<SpecificProductPage />} /> {/* Fixed component name */}
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path ="/addProduct" element={<AddProduct />} /> {/* Add route for adding product */}
        <Route path="/order-history" element={<OrderHistoryPage />} /> {/* Add route for order history */}
        <Route path ="/Admin" element={<AdminPage />} /> {/* Add route for admin page */}
      </Routes>
    </Router>
  );
}

export default App;