import { useDispatch, useSelector } from 'react-redux'
import type { CartItem } from '@/types/product.types'
import { RootState } from '@/store'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'

// Selector functions for testing
export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalItems = (state: RootState) => state.cart.totalItems
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice

export const useCart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const totalPrice = useSelector(selectTotalPrice)

  return {
    items,
    totalItems,
    totalPrice,
    addToCart: (product: CartItem) => dispatch(addToCart(product)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    updateQuantity: (id: number, quantity: number) => 
      dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
  }
}