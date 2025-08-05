import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';
import type { CartItem as CartItemType } from '../Cart/Cart.types';
export type CartItem = CartItemType;

export type CheckoutStepId = 'shipping' | 'payment' | 'review';

export interface CheckoutStep {
  id: CheckoutStepId;
  title: string;
  description: string;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  billingAddressSameAsShipping: boolean;
}

export interface CheckoutContextValue {
  currentStep: CheckoutStepId;
  steps: CheckoutStep[];
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
}

// Component props
export interface CheckoutRootProps extends BaseComponentProps {
  onComplete?: (orderDetails: {
    items: CartItem[];
    shipping: ShippingDetails;
    payment: PaymentDetails;
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      total: number;
    };
  }) => void;
  children: ReactNode;
}

export interface CheckoutHeaderProps extends BaseComponentProps {
  title?: string;
}



export type CheckoutSummaryProps = BaseComponentProps;
export type CheckoutShippingProps = BaseComponentProps;
export type CheckoutPaymentProps = BaseComponentProps;
export type CheckoutReviewProps = BaseComponentProps;

export interface OrderDetails {
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

// Compound component type
export interface CheckoutComponent {
  Root: React.FC<CheckoutRootProps>;
  Header: React.FC<CheckoutHeaderProps>;
  Summary: React.FC<CheckoutSummaryProps>;
  Shipping: React.FC<CheckoutShippingProps>;
  Payment: React.FC<CheckoutPaymentProps>;
  Review: React.FC<CheckoutReviewProps>;
}