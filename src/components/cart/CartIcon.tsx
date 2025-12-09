import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

const CartIcon: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
      {hovered && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="text-sm text-gray-600">
            <div className="flex justify-between mb-2">
              <span>Items in cart:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <Link
              to="/cart"
              className="block w-full mt-2 text-center bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </Link>
  );
};

export { CartIcon };