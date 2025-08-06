'use client';

import { useRouter } from 'next/navigation';
import Page from '@/components/layout/Page';
import Content from '@/components/layout/Content';
import Card from '@/components/ui/cards/Card';
import Checkout from '@/components/ui/layout/Checkout';
import type { OrderDetails } from '@/components/ui/layout/Checkout/types';

export default function CheckoutPage() {
  const router = useRouter();

  const handleOrderComplete = (orderDetails: OrderDetails) => {
    // Here you would typically:
    // 1. Clear the cart
    // 2. Save order details
    // 3. Redirect to order confirmation
    console.log('Order completed:', orderDetails);
    router.push('/checkout/confirmation');
  };

  return (
    <Page background="gray">
      <Content>
        <Checkout.Root onComplete={handleOrderComplete}>
          <Checkout.Header />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <Checkout.Steps />
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Checkout.Summary />
            </div>
          </div>
        </Checkout.Root>
      </Content>
    </Page>
  );
}