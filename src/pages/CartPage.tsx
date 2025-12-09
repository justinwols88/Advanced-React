import React from 'react';
import type { CartItem } from '@/types/product.types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { clearCart, updateQuantity, removeFromCart } from '@/store/cartSlice';
import { Button } from '@/components/common/Button';


const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
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
            {items.map((item: CartItem) => (
              <div key={item.id} className="p-6 border-b last:border-0">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => dispatch(updateQuantity({ 
                            id: item.id, 
                            quantity: item.quantity - 1 
                          }))}
                          className="px-3 py-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ 
                            id: item.id, 
                            quantity: item.quantity + 1 
                          }))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
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