import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/common/Button';
import { CheckCircle, CreditCard, Shield, Truck, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  totalPrice,
}) => {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');

  const handleComplete = () => {
    setStep('processing');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-1 shadow-2xl transition-all">
                <div className="bg-white p-8">
                  {/* Processing State */}
                  {step === 'processing' && (
                    <div className="text-center">
                      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary-100 to-primary-200">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        Processing Payment
                      </h3>
                      <p className="text-gray-600">
                        Please wait while we process your order...
                      </p>
                    </div>
                  )}

                  {/* Success State */}
                  {step === 'success' && (
                    <div className="text-center">
                      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-green-200">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        Order Successful!
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Thank you for your purchase. Your order has been confirmed.
                      </p>
                      <div className="rounded-xl bg-green-50 p-4">
                        <div className="flex items-center justify-center gap-2 text-green-700">
                          <Sparkles className="h-5 w-5" />
                          <span className="font-semibold">
                            Order Confirmation #ORD{Date.now().toString().slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Form */}
                  {step === 'payment' && (
                    <>
                      <Dialog.Title className="mb-6 text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
                          <CreditCard className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Complete Checkout
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Enter your payment details
                        </p>
                      </Dialog.Title>

                      <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="rounded-xl border border-gray-200 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="font-semibold text-gray-700">Order Total</span>
                            <span className="text-2xl font-bold text-primary-600">
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>${(totalPrice * 0.9).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax (10%)</span>
                              <span>${(totalPrice * 0.1).toFixed(2)}</span>
                            </div>
                            {totalPrice > 50 && (
                              <div className="flex justify-between text-green-600">
                                <span>Shipping</span>
                                <span className="font-semibold">FREE</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-gray-700">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Demo Notice */}
                        <div className="rounded-xl bg-gradient-to-r from-accent-50 to-accent-100 p-4">
                          <div className="flex items-start gap-3">
                            <Shield className="mt-0.5 h-5 w-5 text-accent-600" />
                            <div>
                              <h4 className="font-semibold text-accent-900">
                                Demo Application
                              </h4>
                              <p className="mt-1 text-sm text-accent-700">
                                This is a demo store. No real payment will be processed.
                                Click "Complete Order" to simulate a successful checkout.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 p-4">
                          <div className="flex items-start gap-3">
                            <Truck className="mt-0.5 h-5 w-5 text-primary-600" />
                            <div>
                              <h4 className="font-semibold text-primary-900">
                                Estimated Delivery
                              </h4>
                              <p className="mt-1 text-sm text-primary-700">
                                2-3 business days • Free shipping
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <Button
                          onClick={onClose}
                          variant="ghost"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleComplete}
                          variant="primary"
                          className="flex-1 shadow-lg"
                          leftIcon={<CreditCard className="h-5 w-5" />}
                        >
                          Complete Order
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { CheckoutModal };