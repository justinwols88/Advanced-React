// Utility script to seed Firestore with products from FakeStore API
import { seedFirestoreProducts } from '@/services/firestoreProducts';

const BASE_URL = 'https://fakestoreapi.com';

export const seedProductsFromAPI = async () => {
  try {
    console.log('Fetching products from FakeStore API...');
    const response = await fetch(`${BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products from API');
    }

    const products = await response.json();
    console.log(`Fetched ${products.length} products from API`);

    console.log('Seeding products to Firestore...');
    await seedFirestoreProducts(products);
    
    console.log('✅ Successfully seeded all products to Firestore!');
    return { success: true, count: products.length };
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    return { success: false, error };
  }
};

// Helper function to check if Firestore has products
export const checkFirestoreProducts = async () => {
  try {
    const { getFirestoreProducts } = await import('@/services/firestoreProducts');
    const products = await getFirestoreProducts();
    
    console.log(`Firestore has ${products.length} products`);
    return products.length > 0;
  } catch (error) {
    console.error('Error checking Firestore products:', error);
    return false;
  }
};
