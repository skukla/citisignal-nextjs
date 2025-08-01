'use client';

import Grid from './Grid';
import ToolCard from './ToolCard';
import type { HeroIcon } from '@/types/hero-icons';

interface Tool {
  icon: HeroIcon;
  title: string;
  description: string;
  link: string;
}

interface ToolGridProps {
  tools: Tool[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
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
  className
}: ToolGridProps) {
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