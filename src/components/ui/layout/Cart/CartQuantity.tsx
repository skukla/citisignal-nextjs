'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import { useCart } from './CartProvider';
import type { CartItem } from './Cart.types';

interface CartQuantityProps {
  item: CartItem;
}

export function CartQuantity({ item }: CartQuantityProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === item.quantity) return;

    if (newQuantity <= 0) {
      removeItem(item.variantId || item.id);
    } else {
      updateQuantity(item.variantId || item.id, newQuantity);
    }
  };

  const handleDecrement = () => handleQuantityChange(item.quantity - 1);
  const handleIncrement = () => handleQuantityChange(item.quantity + 1);

  return (
    <div className="flex items-center gap-1">
      <label className="sr-only">Quantity for {item.name}</label>

      {/* Decrease button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        className="h-8 w-8 p-0 rounded-md border border-gray-300 hover:bg-gray-50"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>

      {/* Quantity display */}
      <div className="flex items-center justify-center min-w-[2.5rem] h-8 px-2 text-sm font-medium border-t border-b border-gray-300 bg-gray-50">
        {item.quantity}
      </div>

      {/* Increase button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        disabled={item.quantity >= 10}
        className="h-8 w-8 p-0 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
