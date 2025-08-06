import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';
import type { CheckoutStepId } from './steps';
import type { ShippingDetails, PaymentDetails } from './forms';
import type { ValidationResult } from './validation';

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
  validateStep: (step: CheckoutStepId) => ValidationResult<ShippingDetails | PaymentDetails>;
}