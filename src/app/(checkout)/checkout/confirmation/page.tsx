'use client';

import Page from '@/components/layout/Page';
import Container from '@/components/ui/layout/Container';
import OrderConfirmation from '@/components/ui/feedback/OrderConfirmation';
import { mockOrderData } from '@/data/route-groups/checkout/order-confirmation';

export default function OrderConfirmationPage() {
  // Using mock data until order state management is implemented
  const order = mockOrderData;

  return (
    <Page background="gray">
      <Container className="max-w-2xl">
        <OrderConfirmation order={order} />
      </Container>
    </Page>
  );
}
