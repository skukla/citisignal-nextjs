'use client';

import { type ReactNode } from 'react';
import { CartProvider } from './CartContext';

interface CartRootProviderProps {
  children: ReactNode;
}

export default function CartRootProvider({ children }: CartRootProviderProps) {
  return (
    <CartProvider isOpen={false} onClose={() => {}}>
      {children}
    </CartProvider>
  );
}
