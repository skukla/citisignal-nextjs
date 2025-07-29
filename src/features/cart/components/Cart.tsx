'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { 
  CartContextValue, 
  BaseCartProps,
  CartComponent,
  CartItem
} from '../types/cart.types';
import { useCart } from '../hooks/useCart';

// Create context
const CartContext = createContext<CartContextValue | null>(null);

function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Cart components must be used within Cart.Root');
  }
  return context;
}

// Individual components
const CartRoot = ({ children, className }: BaseCartProps) => {
  const cartState = useCart();

  return (
    <CartContext.Provider value={cartState}>
      <div className={className}>
        {children}
      </div>
    </CartContext.Provider>
  );
};

const CartIcon = ({ className }: BaseCartProps) => {
  const { itemCount, toggle } = useCartContext();

  return (
    <button
      onClick={toggle}
      className={twMerge(
        'relative p-2 text-gray-700 hover:text-purple-600 transition-colors cursor-pointer',
        className
      )}
      data-testid="cart-trigger"
    >
      <ShoppingCartIcon className="w-6 h-6" />
      {itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center bg-purple-600"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
};

const CartPanel = ({ className }: BaseCartProps) => {
  const { isOpen, panelRef, items, updateQuantity, removeItem } = useCartContext();

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      data-testid="cart-panel"
    >
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <div className="p-4 text-gray-700 text-center">
          Your cart is empty
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map(item => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <div className="text-sm text-gray-700">
                  ${item.price.toFixed(2)} × {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Create compound component
const Cart: CartComponent = {
  Root: CartRoot,
  Icon: CartIcon,
  Panel: CartPanel
} as const;

// Export
export default Cart; 