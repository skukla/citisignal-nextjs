import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';

interface PlanCardPricingProps {
  price: number;
  priceColor?: ThemeTextColor;
  periodColor?: ThemeTextColor;
  className?: string;
}

export default function PlanCardPricing({
  price,
  priceColor = 'text-gray-900',
  periodColor = 'text-gray-600',
  className
}: PlanCardPricingProps) {
  return (
    <div className={twMerge('h-[48px] flex flex-col justify-end', className)}>
      <div className="flex items-baseline">
        <span className={twMerge('text-3xl font-bold', priceColor)}>
          ${price}
        </span>
        <span className={twMerge('ml-1', periodColor)}>
          /month
        </span>
      </div>
    </div>
  );
} 