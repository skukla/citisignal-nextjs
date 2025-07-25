'use client';

import Container from '@/components/ui/Container';
import FooterLogo from './FooterLogo';
import SocialLinks from './SocialLinks';
import FooterLinkGroup from './FooterLinkGroup';
import FooterBottom from './FooterBottom';
import { socialLinks, footerLinks } from '@/data/navigation';

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
            links={footerLinks.shop}
          />

          <FooterLinkGroup
            title="Support"
            links={footerLinks.support}
          />

          <FooterLinkGroup
            title="Legal"
            links={footerLinks.legal}
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