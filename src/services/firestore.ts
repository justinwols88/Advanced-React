import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { CartItem } from '@/types/cart.types';

// User Profile
export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const createUserProfile = async (uid: string, email: string, firstName: string, lastName: string) => {
  const userRef = doc(db, 'users', uid);
  const profile: Partial<UserProfile> = {
    uid,
    email,
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };
  await setDoc(userRef, profile);
  return profile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteUserAccount = async (uid: string) => {
  // Delete user profile
  const userRef = doc(db, 'users', uid);
  await deleteDoc(userRef);
  
  // Delete user's cart
  const cartRef = doc(db, 'carts', uid);
  await deleteDoc(cartRef);
  
  // Delete user's wishlist
  const wishlistRef = doc(db, 'wishlists', uid);
  await deleteDoc(wishlistRef);
  
  // Note: Orders are kept for record-keeping purposes
  // If you want to delete orders too, uncomment below:
  // const ordersRef = collection(db, 'orders');
  // const q = query(ordersRef, where('userId', '==', uid));
  // const snapshot = await getDocs(q);
  // snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
};

// Cart Management
export const saveCartToFirestore = async (uid: string, cart: CartItem[]) => {
  const cartRef = doc(db, 'carts', uid);
  await setDoc(cartRef, {
    items: cart,
    updatedAt: serverTimestamp(),
  });
};

export const getCartFromFirestore = async (uid: string): Promise<CartItem[]> => {
  const cartRef = doc(db, 'carts', uid);
  const cartSnap = await getDoc(cartRef);
  if (cartSnap.exists()) {
    return cartSnap.data().items || [];
  }
  return [];
};

// Wishlist Management
export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  addedAt: Timestamp;
}

export const addToWishlist = async (uid: string, product: Omit<WishlistItem, 'addedAt'>) => {
  const wishlistRef = doc(db, 'wishlists', uid);
  const wishlistSnap = await getDoc(wishlistRef);
  
  let items: WishlistItem[] = [];
  if (wishlistSnap.exists()) {
    items = wishlistSnap.data().items || [];
  }
  
  // Check if already in wishlist
  if (!items.find(item => item.id === product.id)) {
    items.push({
      ...product,
      addedAt: serverTimestamp() as Timestamp,
    });
    
    await setDoc(wishlistRef, {
      items,
      updatedAt: serverTimestamp(),
    });
  }
};

export const removeFromWishlist = async (uid: string, productId: number) => {
  const wishlistRef = doc(db, 'wishlists', uid);
  const wishlistSnap = await getDoc(wishlistRef);
  
  if (wishlistSnap.exists()) {
    const items: WishlistItem[] = wishlistSnap.data().items || [];
    const filteredItems = items.filter(item => item.id !== productId);
    
    await setDoc(wishlistRef, {
      items: filteredItems,
      updatedAt: serverTimestamp(),
    });
  }
};

export const getWishlist = async (uid: string): Promise<WishlistItem[]> => {
  const wishlistRef = doc(db, 'wishlists', uid);
  const wishlistSnap = await getDoc(wishlistRef);
  
  if (wishlistSnap.exists()) {
    return wishlistSnap.data().items || [];
  }
  return [];
};

// Order Management
export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  const ordersRef = collection(db, 'orders');
  const orderData = {
    ...order,
    status: 'pending' as const,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  const docRef = await addDoc(ordersRef, orderData);
  return docRef.id;
};

export const getUserOrders = async (uid: string): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(
    ordersRef,
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const orders: Order[] = [];
  
  querySnapshot.forEach((doc) => {
    orders.push({
      id: doc.id,
      ...doc.data(),
    } as Order);
  });
  
  return orders;
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (orderSnap.exists()) {
    return {
      id: orderSnap.id,
      ...orderSnap.data(),
    } as Order;
  }
  return null;
};
