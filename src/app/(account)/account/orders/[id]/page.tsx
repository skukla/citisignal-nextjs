import { AccountDashboard } from '@/components/ui/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import Link from 'next/link';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  return (
    <AccountDashboard>
      <AccountSection
        title="Order Details"
        description={`Order #${id}`}
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
