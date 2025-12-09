import { CartItem } from '@/types/product.types';

const CART_STORAGE_KEY = 'ecommerce_cart';

export const storage = {
  // Save cart to sessionStorage
  saveCart: (cartItems: CartItem[]): void => {
    try {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to sessionStorage:', error);
    }
  },

  // Load cart from sessionStorage
  loadCart: (): CartItem[] => {
    try {
      const cartData = sessionStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart from sessionStorage:', error);
      return [];
    }
  },

  // Clear cart from sessionStorage
  clearCart: (): void => {
    try {
      sessionStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from sessionStorage:', error);
    }
  },
};