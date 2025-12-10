import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import CartPage from '@/pages/CartPage';
import CategoryPage from '@/pages/CategoryPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/electronics" element={<CategoryPage />} />
              <Route path="/category/jewelery" element={<CategoryPage />} />
              <Route path="/category/men's clothing" element={<CategoryPage />} />
              <Route path="/category/women's clothing" element={<CategoryPage />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
} 

export default App;