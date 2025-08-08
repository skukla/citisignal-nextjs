'use client';

import { useRouter } from 'next/navigation';
import Content from '@/components/layout/Content';
import Card from '@/components/ui/cards/Card';
import Checkout from '@/components/ui/layout/Checkout';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { useCartContext } from '@/components/ui/layout/Cart/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { OrderDetails } from '@/components/ui/layout/Checkout/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartContext();

  const handleOrderComplete = (orderDetails: OrderDetails) => {
    // Here you would typically:
    // 1. Clear the cart
    // 2. Save order details
    // 3. Redirect to order confirmation
    console.log('Order completed:', orderDetails);
    router.push('/checkout/confirmation');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Content>
        {items.length > 0 ? (
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
        ) : (
          <Card className="p-12">
            <EmptyState
              icon={ShoppingCartIcon}
              title="Your cart is empty"
              description="Add some items to your cart to begin checkout"
              actionLabel="Continue Shopping"
              onAction={handleContinueShopping}
            />
          </Card>
        )}
      </Content>
    </div>
  );
}