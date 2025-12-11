import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useCartSync } from '@/hooks/useCartSync';
import HomePage from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import CartPage from '@/pages/CartPage';
import CategoryPage from '@/pages/CategoryPage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import OrdersPage from '@/pages/OrdersPage';
import WishlistPage from '@/pages/WishlistPage';

const queryClient = new QueryClient();

function AppContent() {
  useCartSync(); // Sync cart with Firestore on login

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category" element={<Navigate to="/" replace />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;