'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { FC } from 'react';
import type { TopBarProps, AuthLink } from '@/types/ui';

interface AnnouncementProps {
  children: string;
  className?: string;
}

interface SupportInfoProps {
  phone: string;
  className?: string;
}

interface AuthLinksProps {
  links: readonly AuthLink[];
  className?: string;
}

// Sub-components
export const Announcement: FC<AnnouncementProps> = ({ children, className }) => (
  <div className={twMerge('text-sm text-white truncate', className)}>
    {children}
  </div>
);

export const SupportInfo: FC<SupportInfoProps> = ({ phone, className }) => (
  <div className={twMerge('hidden sm:flex items-center space-x-1', className)}>
    <span className="text-sm text-gray-300">Support:</span>
    <span className="text-sm font-medium text-white">{phone}</span>
  </div>
);

export const AuthLinks: FC<AuthLinksProps> = ({ links, className }) => (
  <div className={twMerge('flex items-center space-x-2 sm:space-x-4', className)}>
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-sm text-white hover:text-purple-300 transition-colors whitespace-nowrap"
      >
        {link.label}
      </Link>
    ))}
  </div>
);

// Main component
export const TopBar: FC<TopBarProps> = ({ 
  announcement, 
  supportPhone, 
  authLinks,
  className 
}) => {
  return (
    <div className={twMerge('bg-black border-b border-gray-800', className)}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-9">
          <div className="w-1/2 sm:w-auto">
            <Announcement>{announcement}</Announcement>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <AuthLinks links={authLinks} />
            <SupportInfo phone={supportPhone} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Create compound component
const TopBarNamespace = {
  Root: TopBar,
  Announcement,
  AuthLinks,
  SupportInfo
} as const;

// Default export
export default TopBarNamespace; 