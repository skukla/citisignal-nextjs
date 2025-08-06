'use client';

import { useCheckoutContext } from './CheckoutContext';
import CheckoutShipping from './CheckoutShipping';
import CheckoutPayment from './CheckoutPayment';
import CheckoutReview from './CheckoutReview';

interface CheckoutStepsProps {
  className?: string;
}

/**
 * Renders the current checkout step based on checkout state.
 */
export function CheckoutSteps({ className = '' }: CheckoutStepsProps) {
  const { currentStep } = useCheckoutContext();

  switch (currentStep) {
    case 'shipping':
      return <CheckoutShipping className={className} />;
    case 'payment':
      return <CheckoutPayment className={className} />;
    case 'review':
      return <CheckoutReview className={className} />;
    default:
      return null;
  }
}