interface NavItem {
  href: string;
  label: string;
}

export const mainNavItems: NavItem[] = [
  { href: '/phones', label: 'Phones' },
  { href: '/watches', label: 'Watches' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/plans', label: 'Plans' },
  { href: '/streaming', label: 'Streaming' },
  { href: '/internet-deals', label: 'Internet Deals' }
];

export const authLinks: NavItem[] = [
  { href: '/signin', label: 'Sign In' },
  { href: '/signup', label: 'Create Account' }
]; 