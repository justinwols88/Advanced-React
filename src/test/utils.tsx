import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/cartSlice';

// Create a custom render function that includes all providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
    },
  });

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient();
  const store = createTestStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
