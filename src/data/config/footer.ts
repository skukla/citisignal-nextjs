export const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' }
] as const;

// Shop links are now dynamically loaded from Commerce API

export const plansLinks = [
  { href: '/plans', label: 'View All Plans' },
  { href: '/plans/unlimited', label: 'Unlimited Plans' },
  { href: '/plans/family', label: 'Family Plans' },
  { href: '/plans/prepaid', label: 'Prepaid Plans' }
] as const;

export const supportLinks = [
  { href: '/support', label: 'Support Center' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/stores', label: 'Store Locator' },
  { href: '/coverage', label: 'Coverage Map' }
] as const;

export const companyLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/open-internet', label: 'Open Internet' },
  { href: '/about', label: 'About CitiSignal' },
  { href: '/careers', label: 'Careers' }
] as const;

export const footerContent = {
  logo: {
    description: "America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage."
  },
  bottom: {
    copyright: '© 2025 CitiSignal. All rights reserved.',
    phone: '1-800-CITISIGNAL',
    availability: 'Available 24/7'
  }
} as const;