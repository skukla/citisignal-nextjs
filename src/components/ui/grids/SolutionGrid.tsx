'use client';

import Grid from './Grid';
import SolutionCard from '@/components/ui/cards/SolutionCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import type { ResponsiveValue, GridGap } from '@/types/grid';
import type { Solution } from '@/types/content';

interface SolutionGridProps {
  solutions: Solution[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * A grid component for displaying solution cards in a responsive layout.
 * Built on the base Grid component.
 *
 * @example
 * ```tsx
 * <SolutionGrid
 *   solutions={solutions}
 *   columns={{ sm: 1, md: 2, lg: 4 }}
 *   gap="lg"
 * />
 * ```
 */
export default function SolutionGrid({
  solutions,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className,
  emptyState
}: SolutionGridProps) {
  // Handle empty state
  if (solutions.length === 0) {
    return (
      <EmptyState
        icon={PuzzlePieceIcon}
        title={emptyState?.title || "No solutions found"}
        description={emptyState?.description || "There are no solutions to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {solutions.map((solution, index) => (
        <SolutionCard
          key={index}
          icon={solution.icon}
          title={solution.title}
          description={solution.description}
          features={solution.features}
          href={solution.link}
        />
      ))}
    </Grid>
  );
} 