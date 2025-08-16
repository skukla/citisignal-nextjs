'use client';

import Container from '@/components/ui/layout/Container';
import { headerConfig } from '@/data/config/header';

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
          {/* Announcement - always visible */}
          <div className="text-sm text-white">
            {headerConfig.topBar.announcement}
          </div>
          
          {/* Support phone - always visible */}
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-300 hidden sm:inline">Support:</span>
            <span className="text-sm font-medium text-white">
              {headerConfig.topBar.supportPhone}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}