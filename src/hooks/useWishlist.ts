import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { 
  addToWishlist as addToWishlistFirestore, 
  removeFromWishlist as removeFromWishlistFirestore, 
  getWishlist,
  WishlistItem 
} from '@/services/firestore';

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const items = await getWishlist(user.uid);
          setWishlist(items);
        } catch (error) {
          console.error('Error loading wishlist:', error);
        }
      } else {
        setWishlist([]);
      }
      setLoading(false);
    };

    loadWishlist();
  }, [user]);

  const addToWishlist = async (product: Omit<WishlistItem, 'addedAt'>) => {
    if (!user) return;

    try {
      await addToWishlistFirestore(user.uid, product);
      const updatedWishlist = await getWishlist(user.uid);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return;

    try {
      await removeFromWishlistFirestore(user.uid, productId);
      const updatedWishlist = await getWishlist(user.uid);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
