import { useState, useEffect } from 'react';
import { 
  getFirestoreProducts, 
  getFirestoreProduct,
  getFirestoreProductsByCategory,
  searchFirestoreProducts 
} from '@/services/firestoreProducts';
import type { Product } from '@/types/product.types';

// Hook to fetch all products or by category
export const useFirestoreProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getFirestoreProducts(category);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products from Firestore');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

// Hook to fetch a single product
export const useFirestoreProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getFirestoreProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product from Firestore');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

// Hook to search products
export const useSearchFirestoreProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchFirestoreProducts(searchTerm);
        setResults(data);
      } catch (err) {
        setError('Failed to search products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, results, loading, error };
};

// Hook to fetch products by category
export const useFirestoreProductsByCategory = (category: string, limitCount?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getFirestoreProductsByCategory(category, limitCount);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch category products from Firestore');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, limitCount]);

  return { products, loading, error };
};
