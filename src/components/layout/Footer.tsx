'use client';

import Container from '@/components/ui/Container';
import FooterLogo from './FooterLogo';
import SocialLinks from './SocialLinks';
import FooterLinkGroup from './FooterLinkGroup';
import FooterBottom from './FooterBottom';

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' }
];

const shopLinks = [
  { href: '/phones', label: 'Phones' },
  { href: '/watches', label: 'Watches' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/plans', label: 'Plans' },
  { href: '/deals', label: 'Deals & Offers' }
];

const supportLinks = [
  { href: '/support', label: 'Customer Service' },
  { href: '/store-locator', label: 'Store Locator' },
  { href: '/coverage', label: 'Coverage Map' },
  { href: '/device-support', label: 'Device Support' },
  { href: '/billing', label: 'Billing' },
  { href: '/contact', label: 'Contact Us' }
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/open-internet', label: 'Open Internet' },
  { href: '/about', label: 'About CitiSignal' },
  { href: '/careers', label: 'Careers' }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <FooterLogo
              description="America's most reliable wireless network. Stay connected with the latest phones, unlimited plans, and nationwide coverage."
            />
            <SocialLinks links={socialLinks} />
          </div>

          <FooterLinkGroup
            title="Shop"
            links={shopLinks}
          />

          <FooterLinkGroup
            title="Support"
            links={supportLinks}
          />

          <FooterLinkGroup
            title="Legal"
            links={legalLinks}
          />
        </div>

        <FooterBottom
          copyright="© 2024 CitiSignal. All rights reserved."
          phone="1-800-CITI-SIG"
          availability="Available 24/7"
        />
      </Container>
    </footer>
  );
} 