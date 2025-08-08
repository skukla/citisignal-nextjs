'use client';

import { AccountDashboard } from '@/components/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import Link from 'next/link';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  return (
    <AccountDashboard>
      <AccountSection
        title="Order Details"
        description={`Order #${params.id}`}
        actions={
          <Link
            href="/account/orders"
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Back to Orders
          </Link>
        }
      >
        <div className="p-6">
          {/* Order Details will go here */}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}
