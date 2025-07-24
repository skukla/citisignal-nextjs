'use client';

import Link from 'next/link';

interface AuthLink {
  href: string;
  label: string;
}

interface TopBarProps {
  announcement: string;
  supportPhone: string;
  authLinks: AuthLink[];
}

export default function TopBar({ announcement, supportPhone, authLinks }: TopBarProps) {
  return (
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="text-sm text-white">
            {announcement}
          </div>
          <div className="flex items-center space-x-4">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white hover:text-purple-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-300">Support:</span>
              <span className="text-sm font-medium text-white">{supportPhone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 