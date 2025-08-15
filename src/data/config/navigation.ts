export interface NavItem {
  href: string;
  label: string;
  category?: 'shop' | 'plans' | 'support' | 'company';
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// Main navigation items
export const primaryNavItems: readonly NavItem[] = [
  { href: '/phones', label: 'Phones', category: 'shop' },
  { href: '/watches', label: 'Watches', category: 'shop' },
  { href: '/accessories', label: 'Accessories', category: 'shop' },
  { href: '/gift-cards', label: 'Gift Cards', category: 'shop' },
  { href: '/plans', label: 'Plans', category: 'plans' },
  { href: '/streaming', label: 'Streaming', category: 'plans' }
] as const;

// Footer navigation organized by category
export const footerNavigation = {
  shop: [
    { href: '/phones', label: 'Phones' },
    { href: '/watches', label: 'Watches' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/gift-cards', label: 'Gift Cards' }
  ],
  plans: [
    { href: '/plans', label: 'View All Plans' },
    { href: '/plans/unlimited', label: 'Unlimited Plans' },
    { href: '/plans/family', label: 'Family Plans' },
    { href: '/plans/prepaid', label: 'Prepaid Plans' }
  ],
  support: [
    { href: '/support', label: 'Support Center' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/stores', label: 'Store Locator' },
    { href: '/coverage', label: 'Coverage Map' }
  ],
  company: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/open-internet', label: 'Open Internet' },
    { href: '/about', label: 'About CitiSignal' },
    { href: '/careers', label: 'Careers' }
  ]
} as const;

// Social media links
export const socialLinks: readonly SocialLink[] = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' }
] as const;

// Company information
export const companyInfo = {
  name: 'CitiSignal',
  description: "America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage.",
  phone: '1-800-CITISIGNAL',
  availability: 'Available 24/7',
  copyright: '© 2025 CitiSignal. All rights reserved.'
} as const;