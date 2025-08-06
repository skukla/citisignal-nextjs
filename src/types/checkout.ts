export interface CheckoutStep {
  title: string;
  description: string;
}

export interface CheckoutSteps {
  shipping: CheckoutStep;
  payment: CheckoutStep;
  review: CheckoutStep;
}

export interface CheckoutSummary {
  title: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
}

export interface CheckoutPageData {
  steps: CheckoutSteps;
  summary: CheckoutSummary;
}