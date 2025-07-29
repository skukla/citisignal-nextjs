import type { NavItem } from '../types/navigation.types';

export const navItems: readonly NavItem[] = [
  { href: '/phones', label: 'Phones' },
  { href: '/watches', label: 'Watches' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/plans', label: 'Plans' },
  { href: '/streaming', label: 'Streaming' },
  { href: '/internet-deals', label: 'Internet Deals' }
] as const; 