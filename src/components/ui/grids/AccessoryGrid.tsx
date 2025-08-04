'use client';

import { memo } from 'react';
import Grid from './Grid';
import AccessoryCard from '@/components/ui/cards/AccessoryCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { CubeIcon } from '@heroicons/react/24/outline';
import type { GridProps } from '@/types/grid';
import type { Accessory } from '@/types/content';

export type { Accessory };

interface AccessoryGridProps {
  accessories: Accessory[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onAccessoryClick?: (accessory: Accessory) => void;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
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
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'md',
  className,
  onAccessoryClick,
  emptyState
}: AccessoryGridProps) {
  // Handle empty state
  if (accessories.length === 0) {
    return (
      <EmptyState
        icon={CubeIcon}
        title={emptyState?.title || "No accessories found"}
        description={emptyState?.description || "There are no accessories to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

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