// Cart Compound Component
export { CartRoot } from './CartRoot';
export { CartIcon } from './CartIcon';
export { CartPanel } from './CartPanel';

// Compound component namespace
import { CartRoot } from './CartRoot';
import { CartIcon } from './CartIcon';
import { CartPanel } from './CartPanel';
import type { CartComponent } from './Cart.types';

/**
 * Cart compound component for building shopping cart functionality.
 * Provides a complete cart interface with icon, panel, and item management.
 *
 * @example
 * <Cart.Root>
 *   <Cart.Icon aria-label="Shopping cart" />
 *   <Cart.Panel id="cart-panel" />
 * </Cart.Root>
 */
const Cart: CartComponent = {
  Root: CartRoot,
  Icon: CartIcon,
  Panel: CartPanel
};

export default Cart;

// Context
export { useCartContext } from './CartRoot';

// Hooks
export { useCart } from './useCart';

// Types
export type * from './Cart.types';