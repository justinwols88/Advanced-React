// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specifications?: Record<string, string>;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}