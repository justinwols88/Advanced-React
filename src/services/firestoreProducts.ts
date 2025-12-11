import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import type { Product } from '@/types/product.types';

// Firestore collection reference
const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';

// Product interface with Firestore timestamps
export interface FirestoreProduct extends Omit<Product, 'id'> {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  stock?: number;
  featured?: boolean;
}

// Get all products from Firestore
export const getFirestoreProducts = async (categoryFilter?: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    let q = query(productsRef);

    if (categoryFilter) {
      q = query(productsRef, where('category', '==', categoryFilter));
    }

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id) || 0,
        ...doc.data() as Omit<Product, 'id'>
      });
    });

    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
};

// Get single product by ID from Firestore
export const getFirestoreProduct = async (id: number): Promise<Product | null> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id.toString());
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return {
        id: parseInt(productSnap.id),
        ...productSnap.data() as Omit<Product, 'id'>
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product from Firestore:', error);
    return null;
  }
};

// Add a new product to Firestore
export const addFirestoreProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      stock: 100,
      featured: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    throw error;
  }
};

// Update an existing product in Firestore
export const updateFirestoreProduct = async (
  id: number, 
  updates: Partial<Product>
): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id.toString());
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating product in Firestore:', error);
    throw error;
  }
};

// Delete a product from Firestore
export const deleteFirestoreProduct = async (id: number): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id.toString());
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
    throw error;
  }
};

// Get products by category with pagination
export const getFirestoreProductsByCategory = async (
  category: string,
  limitCount: number = 20
): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where('category', '==', category),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id) || 0,
        ...doc.data() as Omit<Product, 'id'>
      });
    });

    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Get featured products
export const getFeaturedProducts = async (limitCount: number = 10): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where('featured', '==', true),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: parseInt(doc.id) || 0,
        ...doc.data() as Omit<Product, 'id'>
      });
    });

    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Seed products from external API to Firestore (one-time operation)
export const seedFirestoreProducts = async (products: Product[]): Promise<void> => {
  try {
    const batch: Promise<void>[] = [];

    products.forEach((product) => {
      const productRef = doc(db, PRODUCTS_COLLECTION, product.id.toString());
      batch.push(
        setDoc(productRef, {
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          stock: 100,
          featured: false
        })
      );
    });

    await Promise.all(batch);
    console.log('Successfully seeded products to Firestore');
  } catch (error) {
    console.error('Error seeding products to Firestore:', error);
    throw error;
  }
};

// Get all categories from Firestore
export const getFirestoreCategories = async (): Promise<string[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const querySnapshot = await getDocs(productsRef);
    
    const categoriesSet = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category) {
        categoriesSet.add(data.category);
      }
    });

    return Array.from(categoriesSet);
  } catch (error) {
    console.error('Error fetching categories from Firestore:', error);
    return [];
  }
};

// Search products by title
export const searchFirestoreProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const querySnapshot = await getDocs(productsRef);
    
    const products: Product[] = [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.title?.toLowerCase().includes(lowerSearchTerm)) {
        products.push({
          id: parseInt(doc.id) || 0,
          ...data as Omit<Product, 'id'>
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Error searching products in Firestore:', error);
    return [];
  }
};
