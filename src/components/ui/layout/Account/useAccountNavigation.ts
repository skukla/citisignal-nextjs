'use client';

import { usePathname } from 'next/navigation';
import { accountNavigation } from '@/data/route-groups/account/navigation';

export function useAccountNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return {
    navigation: accountNavigation,
    isActive
  };
}
