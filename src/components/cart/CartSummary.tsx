import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import { ShoppingCart, Tag, CreditCard, Lock } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  totalPrice,
  onCheckout,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = Math.min(100, (totalPrice / 50) * 100);
      progressBarRef.current.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [totalPrice]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Review your order details before checkout
        </p>
      </div>

      {/* Summary Details */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({totalItems} items)</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className={cn(
              'font-medium',
              shipping === 0 ? 'text-green-600' : 'text-gray-900'
            )}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {totalPrice > 100 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-green-600">
                <Tag className="h-4 w-4" />
                Discount (20% off)
              </span>
              <span className="font-medium text-green-600">
                -${(totalPrice * 0.2).toFixed(2)}
              </span>
            </div>
          )}

          {/* Shipping Progress */}
          {shipping > 0 && totalPrice < 50 && (
            <div className="mt-6 rounded-xl bg-primary-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-700">
                  Free shipping on orders over $50
                </span>
                <span className="text-sm font-bold text-primary-700">
                  ${(50 - totalPrice).toFixed(2)} away
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary-100">
                <div
                  ref={progressBarRef}
                  className={cn("h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500", styles.progressBar)}
                />
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-2xl text-primary-600">
                ${total.toFixed(2)}
              </span>
            </div>
            {totalPrice > 100 && (
              <div className="mt-2 text-right text-sm text-gray-500 line-through">
                ${(total * 1.25).toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          variant="primary"
          size="lg"
          className="mt-8 w-full shadow-lg"
          leftIcon={<CreditCard className="h-5 w-5" />}
        >
          Proceed to Checkout
        </Button>

        {/* Security & Payment Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Secure SSL Encryption</span>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-8 w-12 rounded border bg-gray-100" />
            <div className="h-8 w-12 rounded border bg-gray-100" />
            <div className="h-8 w-12 rounded border bg-gray-100" />
            <div className="h-8 w-12 rounded border bg-gray-100" />
          </div>
          
          <p className="text-center text-xs text-gray-500">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export { CartSummary };