// Standard Footer (default export for simple usage)
export { StandardFooter as default } from './StandardFooter';

// Footer Compound Components (for custom usage)
export { FooterRoot } from './FooterRoot';
export { FooterLogo } from './FooterLogo';
export { FooterSocialLinks } from './FooterSocialLinks';
export { FooterLinkGroup } from './FooterLinkGroup';
export { FooterBottom } from './FooterBottom';

// Compound component namespace for custom usage
import { FooterRoot } from './FooterRoot';
import { FooterLogo } from './FooterLogo';
import { FooterSocialLinks } from './FooterSocialLinks';
import { FooterLinkGroup } from './FooterLinkGroup';
import { FooterBottom } from './FooterBottom';

/**
 * Footer compound component for building custom footer sections.
 * For standard footer, use the default export.
 *
 * @example
 * // Simple usage (recommended):
 * import Footer from '@/components/layout/Footer';
 * <Footer />
 * 
 * // Custom usage:
 * import { Footer } from '@/components/layout/Footer';
 * <Footer.Root>
 *   <Footer.Logo description="Custom description" />
 *   <Footer.LinkGroup title="Custom" links={customLinks} />
 * </Footer.Root>
 */
export interface FooterComponent {
  Root: typeof FooterRoot;
  Logo: typeof FooterLogo;
  SocialLinks: typeof FooterSocialLinks;
  LinkGroup: typeof FooterLinkGroup;
  Bottom: typeof FooterBottom;
}

export const Footer: FooterComponent = {
  Root: FooterRoot,
  Logo: FooterLogo,
  SocialLinks: FooterSocialLinks,
  LinkGroup: FooterLinkGroup,
  Bottom: FooterBottom
};