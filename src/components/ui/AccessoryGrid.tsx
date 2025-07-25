'use client';

import { twMerge } from 'tailwind-merge';
import AccessoryCard from './AccessoryCard';

interface Accessory {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  price: string;
  href: string;
}

interface AccessoryGridProps {
  accessories: Accessory[];
  className?: string;
}

export default function AccessoryGrid({
  accessories,
  className
}: AccessoryGridProps) {
  return (
    <div className={twMerge(
      'grid grid-cols-2 md:grid-cols-4 gap-6',
      className
    )}>
      {accessories.map((accessory) => (
        <AccessoryCard
          key={accessory.title}
          {...accessory}
        />
      ))}
    </div>
  );
} 