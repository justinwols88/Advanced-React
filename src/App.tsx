import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import CartPage from '@/pages/CartPage';
import CategoryPage from '@/pages/CategoryPage';
import AuthPage from '@/pages/AuthPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category" element={<Navigate to="/" replace />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;