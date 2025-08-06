import type { CartItem } from '../../Cart/Cart.types';
import type { CheckoutStepId, CheckoutStep } from './steps';
import type { ShippingDetails, PaymentDetails, TouchedFields } from './forms';
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
  touchedFields: TouchedFields;
  setStep: (step: CheckoutStepId) => void;
  updateShipping: (details: Partial<ShippingDetails>, fieldName?: string) => void;
  updatePayment: (details: Partial<PaymentDetails>, fieldName?: string) => void;
  placeOrder: () => Promise<void>;
  isStepComplete: (step: CheckoutStepId) => boolean;
  canProceedToStep: (step: CheckoutStepId) => boolean;
  validateStep: (step: CheckoutStepId) => ValidationResult<ShippingDetails | PaymentDetails>;
}