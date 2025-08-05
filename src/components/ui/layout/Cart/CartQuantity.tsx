'use client';

import Select from '@/components/ui/foundations/Select';
import { useCartContext } from './CartContext';
import type { CartItem } from './Cart.types';

interface CartQuantityProps {
  item: CartItem;
}

export function CartQuantity({ item }: CartQuantityProps) {
  const { updateQuantity } = useCartContext();

  const options = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={`quantity-${item.id}`} className="sr-only">
        Quantity, {item.quantity}
      </label>
      <Select
        id={`quantity-${item.id}`}
        name={`quantity-${item.id}`}
        value={String(item.quantity)}
        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
        options={options}
        className="w-20 !py-1.5 !text-sm"
      />
    </div>
  );
}