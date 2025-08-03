'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import { headerConfig } from '@/data/header';

/**
 * TopBar component specifically for Header with announcement, auth links, and support info.
 * Uses header configuration data directly for complete encapsulation.
 * 
 * @example
 * ```tsx
 * <Header.TopBar />
 * ```
 */
export function HeaderTopBar() {
  return (
    <div className="bg-black border-b border-gray-800">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="text-sm text-white">
            {headerConfig.topBar.announcement}
          </div>
          <div className="flex items-center space-x-4">
            {headerConfig.topBar.authLinks.map((link) => (
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
              <span className="text-sm font-medium text-white">
                {headerConfig.topBar.supportPhone}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}