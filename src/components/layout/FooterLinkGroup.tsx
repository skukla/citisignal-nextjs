'use client';

import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

export default function FooterLinkGroup({
  title,
  links,
  className = ''
}: FooterLinkGroupProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
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