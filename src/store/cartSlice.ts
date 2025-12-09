import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '@/types/product.types'
import { trace } from '@opentelemetry/api'

// Helper to safely create spans with error handling
const createSpan = (name: string, attributes?: Record<string, any>) => {
  try {
    const tracer = trace.getTracer('cart-operations')
    return tracer.startSpan(name, { attributes })
  } catch (error) {
    return null // Return null if tracing not available
  }
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const span = createSpan('cart.addToCart', {
        'product.id': action.payload.id,
        'product.title': action.payload.title,
        'product.price': action.payload.price,
        'quantity': action.payload.quantity || 1,
      })
      
      try {
        const existingItem = state.items.find(item => item.id === action.payload.id)
        if (existingItem) {
          existingItem.quantity += action.payload.quantity || 1
          span?.setAttribute('action', 'quantity_updated')
        } else {
          state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
          span?.setAttribute('action', 'item_added')
        }
        updateTotals(state)
        span?.setAttribute('cart.totalItems', state.totalItems)
        span?.setAttribute('cart.totalPrice', state.totalPrice)
      } finally {
        span?.end()
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const span = createSpan('cart.removeFromCart', {
        'product.id': action.payload,
      })
      
      try {
        state.items = state.items.filter(item => item.id !== action.payload)
        updateTotals(state)
        span?.setAttribute('cart.totalItems', state.totalItems)
      } finally {
        span?.end()
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const span = createSpan('cart.updateQuantity', {
        'product.id': action.payload.id,
        'quantity.new': action.payload.quantity,
      })
      
      try {
        const item = state.items.find(item => item.id === action.payload.id)
        if (item) {
          const oldQuantity = item.quantity
          item.quantity = Math.max(1, action.payload.quantity)
          updateTotals(state)
          span?.setAttribute('quantity.old', oldQuantity)
          span?.setAttribute('cart.totalItems', state.totalItems)
        }
      } finally {
        span?.end()
      }
    },
    clearCart: (state) => {
      const span = createSpan('cart.clearCart', {
        'items.count': state.items.length,
      })
      
      try {
        state.items = []
        state.totalItems = 0
        state.totalPrice = 0
      } finally {
        span?.end()
      }
    },
  },
})

function updateTotals(state: CartState) {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
  state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer