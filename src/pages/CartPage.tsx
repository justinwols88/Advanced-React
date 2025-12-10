import React from 'react';
import type { CartItem as CartItemType } from '@/types/product.types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { clearCart, updateQuantity, removeFromCart } from '@/store/cartSlice';
import { Button } from '@/components/common/Button';
import { CartItem } from '@/components/cart/CartItem';


const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Add some products to get started!
        </p>
        <Link to="/">
          <Button variant="primary">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow">
            {items.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({totalItems})</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => {
                dispatch(clearCart());
                alert('Order placed successfully!');
              }}
              variant="primary"
              className="w-full mb-4"
            >
              Checkout
            </Button>
            
            <Link to="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartPage };
export default CartPage;