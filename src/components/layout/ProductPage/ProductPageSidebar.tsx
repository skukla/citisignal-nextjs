'use client';

import { ReactNode } from 'react';

interface ProductPageSidebarProps {
  children: ReactNode;
}

export function ProductPageSidebar({ children }: ProductPageSidebarProps) {
  // TwoColumnLayout handles the responsive layout, we just need semantic markup
  return <>{children}</>;
}