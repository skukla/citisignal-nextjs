'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCheckout } from './hooks/useCheckout';
import type { 
  CheckoutContextValue,
  OrderDetails
} from './types';

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

interface CheckoutProviderProps {
  children: ReactNode;
  onComplete?: (orderDetails: OrderDetails) => void;
}

export function CheckoutProvider({ children, onComplete }: CheckoutProviderProps) {
  const checkout = useCheckout({ onComplete });

  return (
    <CheckoutContext.Provider value={checkout}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
}