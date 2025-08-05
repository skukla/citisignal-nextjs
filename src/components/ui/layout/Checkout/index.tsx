import { CheckoutRoot } from './CheckoutRoot';
import { CheckoutHeader } from './CheckoutHeader';
import { CheckoutSummary } from './CheckoutSummary';
import { CheckoutShipping } from './CheckoutShipping';
import { CheckoutPayment } from './CheckoutPayment';
import { CheckoutReview } from './CheckoutReview';
import type { CheckoutComponent } from './Checkout.types';

const Checkout: CheckoutComponent = {
  Root: CheckoutRoot,
  Header: CheckoutHeader,
  Summary: CheckoutSummary,
  Shipping: CheckoutShipping,
  Payment: CheckoutPayment,
  Review: CheckoutReview
};

export default Checkout;

// Context and hooks
export { useCheckoutContext } from './CheckoutContext';