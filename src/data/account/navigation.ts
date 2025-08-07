import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import type { AccountSectionId } from './dashboard';

export const accountNavigation = [
  {
    id: 'profile' as AccountSectionId,
    label: 'Account & Preferences',
    href: '/account/profile',
    icon: UserIcon
  },
  {
    id: 'orders' as AccountSectionId,
    label: 'Orders & Subscriptions',
    href: '/account/orders',
    icon: ShoppingBagIcon
  },
  {
    id: 'payment' as AccountSectionId,
    label: 'Payment Methods',
    href: '/account/payment',
    icon: CreditCardIcon
  },
  {
    id: 'saved' as AccountSectionId,
    label: 'Saved Items',
    href: '/account/saved',
    icon: HeartIcon
  }
];