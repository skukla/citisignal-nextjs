'use client';

import Link from 'next/link';
import { SOCIAL_ICONS } from '@/lib/constants';

interface SocialLink {
  name: string;
  href: string;
  icon: keyof typeof SOCIAL_ICONS;
}

interface SocialLinksProps {
  links: SocialLink[];
  iconColor?: string;
  hoverColor?: string;
  className?: string;
}

export default function SocialLinks({
  links,
  iconColor = 'text-gray-400',
  hoverColor = 'hover:text-purple-400',
  className = ''
}: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${iconColor} ${hoverColor} transition-colors`}
        >
          <span className="sr-only">{link.name}</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d={SOCIAL_ICONS[link.icon]}
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ))}
    </div>
  );
} 