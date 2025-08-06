import type { CartItem as CartItemType } from '../../Cart/Cart.types';
import type { ShippingDetails, PaymentDetails } from './forms';

export type CartItem = CartItemType;

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