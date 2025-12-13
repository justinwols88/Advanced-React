import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './components/common/Loader';

// Lazy load all route components for better code splitting
const Home = lazy(() => import('./pages/Home'));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category" element={<Navigate to="/" replace />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </Suspense>
  );
};

export { AppRoutes };