export type CheckoutStepId = 'shipping' | 'payment' | 'review';

export interface CheckoutStep {
  id: CheckoutStepId;
  title: string;
  description: string;
  isComplete: boolean;
}