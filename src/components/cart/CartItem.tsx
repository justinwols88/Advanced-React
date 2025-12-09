import React from 'react';
import type { CartItem } from '@/types/product.types';
import { X, Minus, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useCart } from '@/hooks/useCart';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="absolute top-2 left-2 z-10">
            {((item.rating?.rate || 0) > 4) && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                Best Seller
              </span>
            )}
            {item.price < 20 && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-1">
                Deal
              </span>
            )}
          </div>
          
          <div className="w-full h-full border rounded-lg overflow-hidden bg-white p-2">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
              fallbackSrc="https://via.placeholder.com/150?text=No+Image"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
            
            <button
              onClick={handleRemove}
              aria-label="Remove item from cart"
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(item.rating?.rate || 0) ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {item.rating?.rate || 0} ({item.rating?.count || 0} reviews)
            </span>
          </div>

          {/* Price and Quantity */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  className={cn(
                    "px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors",
                    item.quantity <= 1 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Minus size={16} />
                </button>
                
                <span className="px-4 py-2 border-x font-medium">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={handleRemove}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Remove
              </button>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                ${item.price.toFixed(2)} each
              </div>
              {item.quantity > 1 && (
                <div className="text-xs text-green-600">
                  Save ${((item.price * item.quantity) * 0.1).toFixed(2)} with bulk
                </div>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-600 font-medium">In stock</span>
            <span className="mx-2">•</span>
            <span>Ships in 24h</span>
            <span className="mx-2">•</span>
            <span>Free shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartItem };