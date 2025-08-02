'use client';

import { memo } from 'react';
import Grid from './Grid';
import AccessoryCard from './AccessoryCard';
import type { GridProps } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

export interface Accessory {
  id: string;
  icon: HeroIcon;
  name: string;
  price?: string;
  href?: string;
  slug?: string;
}

interface AccessoryGridProps {
  accessories: Accessory[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onAccessoryClick?: (accessory: Accessory) => void;
}

/**
 * A grid component for displaying accessory cards in a responsive layout.
 * Built on the base Grid component with AccessoryCard pattern.
 *
 * @example
 * ```tsx
 * <AccessoryGrid
 *   accessories={essentialAccessories}
 *   columns={{ sm: 2, md: 4 }}
 *   gap="md"
 *   onAccessoryClick={(accessory) => router.push(`/accessories/${accessory.slug}`)}
 * />
 * ```
 */
function AccessoryGrid({
  accessories,
  columns = {
    sm: 2,
    md: 4
  },
  gap = 'md',
  className,
  onAccessoryClick
}: AccessoryGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {accessories.map((accessory) => (
        <AccessoryCard
          key={accessory.id}
          icon={accessory.icon}
          name={accessory.name}
          price={accessory.price}
          href={accessory.href}
          onClick={onAccessoryClick ? () => onAccessoryClick(accessory) : undefined}
        />
      ))}
    </Grid>
  );
}

export default memo(AccessoryGrid);