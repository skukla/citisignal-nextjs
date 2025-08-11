'use client';

import { AccountDashboard } from '@/components/ui/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import { savedConfig } from '@/data/route-groups/account/saved';
import EmptyState from '@/components/ui/feedback/EmptyState';

export default function SavedItemsPage() {
  const hasItems = false; // This will come from a hook later

  return (
    <AccountDashboard>
      <AccountSection
        title={savedConfig.wishlist.title}
        description={savedConfig.wishlist.description}
      >
        <div className="p-6">
          {hasItems ? (
            <div>{/* Wishlist Grid will go here */}</div>
          ) : (
            <EmptyState
              title={savedConfig.wishlist.emptyState.title}
              description={savedConfig.wishlist.emptyState.description}
            />
          )}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}