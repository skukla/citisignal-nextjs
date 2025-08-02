import type { AccountMenuItem } from '@/components/ui/Account/Account.types';

export const authenticatedMenuItems: readonly AccountMenuItem[] = [
  { id: 'profile', label: 'Profile', href: '/account/profile' },
  { id: 'orders', label: 'Orders', href: '/account/orders' },
  { id: 'settings', label: 'Settings', href: '/account/settings' }
] as const;