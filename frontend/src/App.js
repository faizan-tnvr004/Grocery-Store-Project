import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage'; // Assuming you have a file that exports categories
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';
import SpecificProductPage from './components/SpecificProductsPage'; // Assuming you have a file that exports specific product page
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
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
      </Routes>
    </Router>
  );
}

export default App;
