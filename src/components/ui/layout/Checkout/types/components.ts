import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';
import type { OrderDetails } from './order';

export interface CheckoutRootProps extends BaseComponentProps {
  onComplete?: (orderDetails: OrderDetails) => void;
  children: ReactNode;
}

export interface CheckoutHeaderProps extends BaseComponentProps {
  title?: string;
}

export type CheckoutSummaryProps = BaseComponentProps;
export type CheckoutShippingProps = BaseComponentProps;
export type CheckoutPaymentProps = BaseComponentProps;
export type CheckoutReviewProps = BaseComponentProps;

export type CheckoutStepsProps = BaseComponentProps;

export interface CheckoutComponent {
  Root: React.FC<CheckoutRootProps>;
  Header: React.FC<CheckoutHeaderProps>;
  Steps: React.FC<CheckoutStepsProps>;
  Summary: React.FC<CheckoutSummaryProps>;
  Shipping: React.FC<CheckoutShippingProps>;
  Payment: React.FC<CheckoutPaymentProps>;
  Review: React.FC<CheckoutReviewProps>;
}