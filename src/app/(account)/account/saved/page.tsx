'use client';

import { AccountPage, AccountPageProvider } from '@/components/layout/AccountPage';
import { savedConfig } from '@/data/route-groups/account/saved';
import EmptyState from '@/components/ui/feedback/EmptyState';

export default function SavedItemsPage() {
  const hasItems = false; // This will come from a hook later
  
  const pageData = {
    title: savedConfig.wishlist.title,
    description: savedConfig.wishlist.description
  };

  return (
    <AccountPageProvider pageData={pageData}>
      <AccountPage.Root>
        <AccountPage.Layout>
          <AccountPage.Navigation />
          
          <AccountPage.Main>
            <AccountPage.Section>
              <AccountPage.Header />
              <AccountPage.Content className="p-6">
                {hasItems ? (
                  <div>{/* Wishlist Grid will go here */}</div>
                ) : (
                  <EmptyState
                    title={savedConfig.wishlist.emptyState.title}
                    description={savedConfig.wishlist.emptyState.description}
                  />
                )}
              </AccountPage.Content>
            </AccountPage.Section>
          </AccountPage.Main>
        </AccountPage.Layout>
      </AccountPage.Root>
    </AccountPageProvider>
  );
}