'use client';

import Link from 'next/link';

import type { BaseComponentProps } from '@/types/ui';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterLinkGroupProps extends BaseComponentProps {
  title: string;
  links: readonly FooterLink[];
  dataSource?: 'commerce' | 'static';
}

export function FooterLinkGroup({
  title,
  links,
  className,
  dataSource
}: FooterLinkGroupProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul 
        className="space-y-2"
        {...(dataSource === 'commerce' && {
          'data-inspector-source': 'commerce',
          'data-inspector-type': 'footer-nav'
        })}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 