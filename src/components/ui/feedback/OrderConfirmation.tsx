'use client';

import Image from 'next/image';
import Card from '@/components/ui/cards/Card';
import Section from '@/components/ui/layout/Section';
import Content from '@/components/layout/Content';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import SuccessMessage from '@/components/ui/feedback/SuccessMessage';
import { useOrderDisplay } from '@/components/ui/layout/Checkout/hooks/useOrderDisplay';
import type { OrderDetails } from '@/types/order';
import { orderConfirmationPageData } from '@/data/route-groups/checkout/order-confirmation';

interface OrderConfirmationProps {
  order: OrderDetails;
}

/**
 * Displays order confirmation details with a success message.
 * Used on the order confirmation page after checkout.
 */
export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const { 
    formatPrice,
    navigateToHome,
    formattedDate,
    formattedAddress,
    formattedTotal
  } = useOrderDisplay(order);
  return (
    <>
      <div className="py-12 mb-12">
        <Content>
          <SuccessMessage
            title={orderConfirmationPageData.message.title}
            description={orderConfirmationPageData.message.description}
            buttonText={orderConfirmationPageData.actions.continueShopping}
            onButtonClick={navigateToHome}
          />
        </Content>
      </div>

      {/* Order Details */}
      <Content>
        <Card className="mb-24">
          <div className="p-12">
          <SectionHeader
            title={`Order #${order.number}`}
            description={`Placed on ${formattedDate}`}
          />

          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">{orderConfirmationPageData.sections.items.title}</h3>
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  {item.image && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <p className="text-base text-gray-900">{item.name}</p>
                    <p className="text-base text-gray-500 mt-1">{orderConfirmationPageData.sections.items.quantity}: {item.quantity}</p>
                  </div>
                  <p className="text-base font-medium text-gray-900 flex-shrink-0">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">{orderConfirmationPageData.sections.shipping.title}</h3>
            <p className="text-base text-gray-500">
              {formattedAddress.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < formattedAddress.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex justify-between">
              <p className="text-lg font-medium text-gray-900">{orderConfirmationPageData.sections.total.title}</p>
              <p className="text-lg font-medium text-gray-900">{formattedTotal}</p>
            </div>
          </div>
        </div>
      </Card>
      </Content>
    </>
  );
}