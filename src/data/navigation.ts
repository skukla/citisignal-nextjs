interface NavItem {
  href: string;
  label: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram';
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

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' }
];

export const footerLinks = {
  shop: [
    { href: '/phones', label: 'Phones' },
    { href: '/watches', label: 'Watches' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/gift-cards', label: 'Gift Cards' },
    { href: '/plans', label: 'Plans' },
    { href: '/deals', label: 'Deals & Offers' }
  ],
  support: [
    { href: '/support', label: 'Customer Service' },
    { href: '/store-locator', label: 'Store Locator' },
    { href: '/coverage', label: 'Coverage Map' },
    { href: '/device-support', label: 'Device Support' },
    { href: '/billing', label: 'Billing' },
    { href: '/contact', label: 'Contact Us' }
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/open-internet', label: 'Open Internet' },
    { href: '/about', label: 'About CitiSignal' },
    { href: '/careers', label: 'Careers' }
  ]
} as const; 