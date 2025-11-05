'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Content from '@/components/layout/Content';
import Card from '@/components/ui/cards/Card';
import Checkout from '@/components/ui/layout/Checkout';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { OrderDetails } from '@/components/ui/layout/Checkout/types';
import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';

// Safe hook that handles SSR gracefully
function useCartItemsSafe() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [cartModule, setCartModule] = useState<typeof import('@/hooks/useCartContext') | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
    // Dynamically import cart context to avoid SSR issues
    import('@/hooks/useCartContext').then((module) => {
      setCartModule(module);
    });
  }, []);

  useEffect(() => {
    if (cartModule && mounted) {
      try {
        const cart = cartModule.useCartContext();
        setItems(cart.items);
      } catch {
        // Cart context not available
        setItems([]);
      }
    }
  }, [cartModule, mounted]);

  return { items, mounted };
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, mounted } = useCartItemsSafe();

  const handleOrderComplete = (_orderDetails: OrderDetails) => {
    // Here you would typically:
    // 1. Clear the cart
    // 2. Save order details: orderDetails
    // 3. Redirect to order confirmation
    router.push('/checkout/confirmation');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  // Show loading state during SSR or initial mount
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Content>
          <Card className="p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading checkout...</p>
            </div>
          </Card>
        </Content>
      </div>
    );
  }

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
