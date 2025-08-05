'use client';

import { FooterRoot } from './FooterRoot';
import { FooterLogo } from './FooterLogo';
import { FooterSocialLinks } from './FooterSocialLinks';
import { FooterLinkGroup } from './FooterLinkGroup';
import { FooterBottom } from './FooterBottom';
import { socialLinks, shopLinks, supportLinks, companyLinks, footerContent } from '@/data/footer';

/**
 * Standard Footer component with default content and layout.
 * Uses Footer compound components internally but provides simple usage.
 * 
 * For custom footer layouts, use the Footer compound components directly.
 */
export function StandardFooter() {
  return (
    <FooterRoot>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <FooterLogo description={footerContent.logo.description} />
          <FooterSocialLinks links={socialLinks} />
        </div>
        <FooterLinkGroup title="Shop" links={shopLinks} />
        <FooterLinkGroup title="Support" links={supportLinks} />
        <FooterLinkGroup title="Company" links={companyLinks} />
      </div>
      <FooterBottom 
        copyright={footerContent.bottom.copyright}
        phone={footerContent.bottom.phone}
        availability={footerContent.bottom.availability}
      />
    </FooterRoot>
  );
}