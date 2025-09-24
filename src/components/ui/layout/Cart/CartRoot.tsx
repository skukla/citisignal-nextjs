'use client';

import { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { CartProvider } from './CartContext';
import { usePanel } from '@/hooks/usePanel';
import { useCart } from './CartProvider';
import type { CartRootProps } from './Cart.types';

export function CartRoot({ isOpen, onClose, children, className }: CartRootProps) {
  const { isLoading } = useCart();

  const handleClose = useCallback(() => {
    (document.activeElement as HTMLElement)?.blur();
    onClose();
  }, [onClose]);

  usePanel({
    isOpen,
    onOpenChange: (newIsOpen) => {
      if (!newIsOpen) handleClose();
    },
  });

  return (
    <CartProvider isOpen={isOpen} onClose={handleClose}>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={twMerge('fixed inset-0 z-50 overflow-hidden', className)}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-out duration-200"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in duration-150"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md">
                    <div
                      className={twMerge(
                        'relative flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl',
                        isLoading && 'pointer-events-none'
                      )}
                    >
                      {children}

                      {/* Loading overlay for entire cart */}
                      {isLoading && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                          <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent" />
                            <p className="text-sm text-gray-600 font-medium">Updating cart...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </CartProvider>
  );
}
