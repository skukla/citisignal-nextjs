'use client';

import { twMerge } from 'tailwind-merge';
import { CheckoutProvider } from './CheckoutContext';
import type { CheckoutRootProps } from './Checkout.types';

export function CheckoutRoot({ 
  children, 
  onComplete,
  className 
}: CheckoutRootProps) {
  return (
    <CheckoutProvider onComplete={onComplete}>
      <div className={twMerge('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
        {children}
      </div>
    </CheckoutProvider>
  );
}