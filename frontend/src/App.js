import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage'; // Assuming you have a file that exports categories
import SpecificProductsPage from './components/SpecificProductsPage'; // Fixed import name
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Fixed component name */}
        <Route path="/product/:productId" element={<SpecificProductsPage />} />

        <Route path="/category/:category" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;