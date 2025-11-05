'use client';

import { type ReactNode } from 'react';
import { CartProvider } from './CartProvider';

interface CartRootProviderProps {
  children: ReactNode;
}

export default function CartRootProvider({ children }: CartRootProviderProps) {
  return <CartProvider>{children}</CartProvider>;
}
