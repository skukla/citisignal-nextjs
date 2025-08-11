'use client';

import { AccountDashboard } from '@/components/ui/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import { orderConfig } from '@/data/route-groups/account/orders';
import EmptyState from '@/components/ui/feedback/EmptyState';

export default function OrdersPage() {
  const hasOrders = false; // This will come from a hook later

  return (
    <AccountDashboard>
      <AccountSection
        title={orderConfig.list.title}
        description={orderConfig.list.description}
      >
        <div className="p-6">
          {hasOrders ? (
            <div>{/* Order List will go here */}</div>
          ) : (
            <EmptyState
              title={orderConfig.list.emptyState.title}
              description={orderConfig.list.emptyState.description}
            />
          )}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}