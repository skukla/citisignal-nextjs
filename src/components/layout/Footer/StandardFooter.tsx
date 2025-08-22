'use client';

import { useMemo, useEffect } from 'react';
import { FooterRoot } from './FooterRoot';
import { FooterLogo } from './FooterLogo';
import { FooterSocialLinks } from './FooterSocialLinks';
import { FooterLinkGroup } from './FooterLinkGroup';
import { FooterBottom } from './FooterBottom';
import { socialLinks, supportLinks, companyLinks, footerContent } from '@/data/config/footer';
import { useCategoryNavigation } from '@/hooks/navigation';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Standard Footer component with default content and layout.
 * Uses Footer compound components internally but provides simple usage.
 *
 * For custom footer layouts, use the Footer compound components directly.
 */
export function StandardFooter() {
  // First check NavigationProvider for navigation data
  const { navigation: contextNav, isStale, setNavigation, isLoadingFromUnified } = useNavigation();

  // Only fetch if no navigation in context or if it's stale, AND not loading from unified query
  const shouldFetch = (!contextNav || isStale()) && !isLoadingFromUnified;
  const { data: categoryNav } = useCategoryNavigation({
    enabled: shouldFetch,
  });

  // Update context when we fetch new data
  useEffect(() => {
    if (categoryNav && shouldFetch) {
      setNavigation(categoryNav, 'standalone');
    }
  }, [categoryNav, shouldFetch, setNavigation]);

  // Use context navigation if available, otherwise use fetched data
  const shopLinks = useMemo(() => {
    const navData = contextNav || categoryNav;
    return navData?.footerNav || [];
  }, [contextNav, categoryNav]);

  return (
    <FooterRoot>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <FooterLogo description={footerContent.logo.description} />
          <FooterSocialLinks links={socialLinks} />
        </div>
        <FooterLinkGroup title="Shop" links={shopLinks} dataSource="commerce" />
        <FooterLinkGroup title="Support" links={supportLinks} dataSource="static" />
        <FooterLinkGroup title="Company" links={companyLinks} dataSource="static" />
      </div>
      <FooterBottom
        copyright={footerContent.bottom.copyright}
        phone={footerContent.bottom.phone}
        availability={footerContent.bottom.availability}
      />
    </FooterRoot>
  );
}
