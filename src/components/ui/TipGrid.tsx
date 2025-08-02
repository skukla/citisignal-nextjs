'use client';

import { memo } from 'react';
import Grid from './Grid';
import TipCard from './TipCard';
import type { GridProps } from '@/types/grid';

export interface Tip {
  id: string;
  category: string;
  title: string;
  description: string;
  href?: string;
  slug?: string;
}

interface TipGridProps {
  tips: Tip[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onTipClick?: (tip: Tip) => void;
}

/**
 * A grid component for displaying tip cards in a responsive layout.
 * Built on the base Grid component with TipCard pattern.
 *
 * @example
 * ```tsx
 * <TipGrid
 *   tips={phoneTips}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="md"
 *   onTipClick={(tip) => router.push(`/tips/${tip.slug}`)}
 * />
 * ```
 */
function TipGrid({
  tips,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'md',
  className,
  onTipClick
}: TipGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          category={tip.category}
          title={tip.title}
          description={tip.description}
          href={tip.href}
          onClick={onTipClick ? () => onTipClick(tip) : undefined}
        />
      ))}
    </Grid>
  );
}

export default memo(TipGrid);