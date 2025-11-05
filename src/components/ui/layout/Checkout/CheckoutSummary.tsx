'use client';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Card from '@/components/ui/cards/Card';
import { formatPrice } from '@/lib/pricing';
import { useCheckoutContext } from './CheckoutContext';
import type { CheckoutSummaryProps } from './types';

export function CheckoutSummary({ className }: CheckoutSummaryProps) {
  const { items, subtotal, tax, shipping, total } = useCheckoutContext();

  return (
    <Card className={twMerge('p-6', className)}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="flex py-6">
              {item.imageUrl && (
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p className="ml-4">{item.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </Card>
  );
}
