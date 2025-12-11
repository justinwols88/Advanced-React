import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from './CheckoutForm';
import { CartItem } from '@/types/cart.types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  totalPrice: number;
  cartItems: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  totalPrice,
  cartItems,
}) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    onComplete();
    onClose();
    navigate('/orders');
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
                  Checkout
                </Dialog.Title>

                <CheckoutForm
                  cartItems={cartItems}
                  total={totalPrice}
                  onSuccess={handleSuccess}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;
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