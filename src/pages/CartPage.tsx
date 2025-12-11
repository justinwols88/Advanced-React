import React, { useState } from 'react';
import type { CartItem as CartItemType } from '@/types/product.types';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { clearCart, updateQuantity, removeFromCart } from '@/store/cartSlice';
import { saveCartToFirestore } from '@/services/firestore';
import { Button } from '@/components/common/Button';
import { CartItem } from '@/components/cart/CartItem';
import CheckoutModal from '@/components/checkout/CheckoutModal';


const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Save cart to Firestore whenever it changes
  React.useEffect(() => {
    if (user && items.length > 0) {
      saveCartToFirestore(user.uid, items).catch(console.error);
    }
  }, [user, items]);

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    dispatch(clearCart());
    setCheckoutOpen(false);
  };

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
              onClick={handleCheckout}
              variant="primary"
              className="w-full mb-4"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
            
            <Link to="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
        totalPrice={totalPrice * 1.1}
        cartItems={items}
      />
    </div>
  );
};

export { CartPage };
export default CartPage;