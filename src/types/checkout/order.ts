import type { CartItem } from '@/components/ui/layout/Cart/Cart.types';
import type { ShippingDetails, PaymentDetails } from '@/components/ui/layout/Checkout/types/forms';

export interface OrderTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface OrderDetails {
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  totals: OrderTotals;
}