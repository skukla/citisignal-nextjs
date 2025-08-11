import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CreditCardIcon,
  HeartIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

export const accountNavigation = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/account/profile',
    icon: UserIcon
  },
  {
    id: 'orders',
    label: 'Orders',
    href: '/account/orders',
    icon: ShoppingBagIcon
  },
  {
    id: 'addresses',
    label: 'Addresses',
    href: '/account/addresses',
    icon: MapPinIcon
  },
  {
    id: 'payment',
    label: 'Payment Methods',
    href: '/account/payment',
    icon: CreditCardIcon
  },
  {
    id: 'wishlists',
    label: 'Wishlists',
    href: '/account/wishlists',
    icon: HeartIcon
  },
  {
    id: 'rewards',
    label: 'Rewards',
    href: '/account/rewards',
    icon: GiftIcon
  }
];