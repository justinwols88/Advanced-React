import { Product } from './product.types';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}