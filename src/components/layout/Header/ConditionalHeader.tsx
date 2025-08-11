'use client';

import { usePathname } from 'next/navigation';
import { StandardHeader } from '@/components/layout/Header/StandardHeader';

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isCheckoutPage = pathname?.startsWith('/checkout');
  
  if (isCheckoutPage) {
    return null;
  }
  
  return <StandardHeader />;
}