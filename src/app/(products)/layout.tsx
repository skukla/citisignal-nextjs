'use client';

import { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="products-layout">
      {children}
    </div>
  );
}