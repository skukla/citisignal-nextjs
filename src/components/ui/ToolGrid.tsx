'use client';

import Grid from './Grid';
import ToolCard from './ToolCard';
import EmptyState from './EmptyState';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import type { ResponsiveValue, GridGap } from '@/types/grid';
import type { Tool } from '@/types/content';

interface ToolGridProps {
  tools: Tool[];
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
 * A grid component for displaying tool cards in a responsive layout.
 * Built on the base Grid component.
 *
 * @example
 * ```tsx
 * <ToolGrid
 *   tools={tools}
 *   columns={{ sm: 1, md: 2, lg: 4 }}
 *   gap="lg"
 * />
 * ```
 */
export default function ToolGrid({
  tools,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className,
  emptyState
}: ToolGridProps) {
  // Handle empty state
  if (tools.length === 0) {
    return (
      <EmptyState
        icon={WrenchScrewdriverIcon}
        title={emptyState?.title || "No tools found"}
        description={emptyState?.description || "There are no tools to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          icon={tool.icon}
          title={tool.title}
          description={tool.description}
          href={tool.link}
        />
      ))}
    </Grid>
  );
} 