import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';        // Default import
import { CartPage } from './pages/CartPage'; // Named import  
import { ProductDetail } from './pages/ProductDetail'; // Named import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export { AppRoutes };