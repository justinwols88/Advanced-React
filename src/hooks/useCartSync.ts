import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { getCartFromFirestore } from '@/services/firestore';
import { setCart } from '@/store/cartSlice';

export const useCartSync = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        try {
          const cartItems = await getCartFromFirestore(user.uid);
          if (cartItems.length > 0) {
            dispatch(setCart(cartItems));
          }
        } catch (error) {
          console.error('Error syncing cart from Firestore:', error);
        }
      }
    };

    syncCart();
  }, [user, dispatch]);
};
