'use client';

import { AccountPage, AccountPageProvider } from '@/components/layout/AccountPage';
import Link from 'next/link';
import { use } from 'react';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = use(params);
  
  const pageData = {
    title: 'Order Details',
    description: `Order #${id}`,
    actions: (
      <Link
        href="/account/orders"
        className="text-sm text-purple-600 hover:text-purple-700"
      >
        Back to Orders
      </Link>
    )
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
                {/* Order Details will go here */}
              </AccountPage.Content>
            </AccountPage.Section>
          </AccountPage.Main>
        </AccountPage.Layout>
      </AccountPage.Root>
    </AccountPageProvider>
  );
}
