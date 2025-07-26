'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface UseBreadcrumbsOptions {
  /**
   * Custom labels for path segments
   * e.g. { phones: 'Mobile Phones', plans: 'Service Plans' }
   */
  labels?: Record<string, string>;
  
  /**
   * Whether to include href for the last item
   * @default false
   */
  linkLastItem?: boolean;
}

export default function useBreadcrumbs(options: UseBreadcrumbsOptions = {}) {
  const { labels = {}, linkLastItem = false } = options;
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Remove trailing slash and split path into segments
    const segments = pathname
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean);

    return segments.map((segment, index) => {
      // Convert segment to readable format if no custom label
      const defaultName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const name = labels[segment] || defaultName;
      const isLast = index === segments.length - 1;

      return {
        name,
        // Don't include href for last item unless specified
        href: !isLast || linkLastItem
          ? `/${segments.slice(0, index + 1).join('/')}`
          : undefined
      };
    });
  }, [pathname, labels, linkLastItem]);

  return breadcrumbs;
} 