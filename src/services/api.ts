// src/services/api.ts
import type { Product } from '@/types/product.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// API functions
const getProducts = async (category?: string): Promise<Product[]> => {
  const url = category 
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  const categories: string[] = await response.json();
  
  return categories.map(cat => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    description: `Browse our collection of ${cat} products`,
    image: '',
    productCount: 0
  }));
};

export const getProductsByCategory = async (
  categoryId: string,
  page: number = 1,
  sortBy: string = 'featured'
): Promise<{
  category: Category;
  products: Product[];
  totalProducts: number;
  totalPages: number;
}> => {
  let products = await getProducts(categoryId);
  
  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      break;
    case 'newest':
      // For newest, reverse the array (assuming API returns oldest first)
      products = [...products].reverse();
      break;
    case 'featured':
    default:
      // Keep original order for featured
      break;
  }
  
  const category: Category = {
    id: categoryId,
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    description: `Browse our collection of ${categoryId} products`,
    image: '',
    productCount: products.length
  };
  
  return {
    category,
    products,
    totalProducts: products.length,
    totalPages: Math.ceil(products.length / 12)
  };
};

// Export api object for hooks
export const api = {
  getProducts,
  getProduct,
  getCategories,
  getProductsByCategory
};