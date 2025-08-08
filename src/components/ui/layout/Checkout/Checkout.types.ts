import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';
import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';
import type { ShippingDetails, PaymentDetails } from './types/forms';
import type { ValidationResult } from './types/validation';
import type { CheckoutStepId } from './types/steps';
import type { OrderDetails } from './types/order';

// Component Props
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

export interface CheckoutComponent {
  Root: React.FC<CheckoutRootProps>;
  Header: React.FC<CheckoutHeaderProps>;
  Summary: React.FC<CheckoutSummaryProps>;
  Shipping: React.FC<CheckoutShippingProps>;
  Payment: React.FC<CheckoutPaymentProps>;
  Review: React.FC<CheckoutReviewProps>;
}

// Context Types
export interface CheckoutContextValue {
  currentStep: CheckoutStepId;
  steps: CheckoutStepId[];
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails | null;
  paymentDetails: PaymentDetails | null;
  setStep: (step: CheckoutStepId) => void;
  updateShipping: (details: Partial<ShippingDetails>) => void;
  updatePayment: (details: Partial<PaymentDetails>) => void;
  placeOrder: () => Promise<void>;
  isStepComplete: (step: CheckoutStepId) => boolean;
  canProceedToStep: (step: CheckoutStepId) => boolean;
  validateStep: (step: CheckoutStepId) => ValidationResult<ShippingDetails | PaymentDetails>;
}

// Page Data Types
export interface CheckoutPageData {
  steps: {
    [key in CheckoutStepId]: {
      title: string;
      description: string;
    };
  };
  summary: {
    title: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
  };
}