'use client';

import { AccountPage, AccountPageProvider } from '@/components/layout/AccountPage';
import { orderConfig } from '@/data/route-groups/account/orders';
import EmptyState from '@/components/ui/feedback/EmptyState';

export default function OrdersPage() {
  const hasOrders = false; // This will come from a hook later
  
  const pageData = {
    title: orderConfig.list.title,
    description: orderConfig.list.description
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
                {hasOrders ? (
                  <div>{/* Order List will go here */}</div>
                ) : (
                  <EmptyState
                    title={orderConfig.list.emptyState.title}
                    description={orderConfig.list.emptyState.description}
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