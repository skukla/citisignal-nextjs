'use client';

import ToolCard from './ToolCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';
import type { HeroIcon } from '@/types/hero-icons';

interface Tool {
  icon: HeroIcon;
  title: string;
  description: string;
  link: string;
}

interface ToolGridProps {
  tools: Tool[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

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
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          icon={tool.icon}
          title={tool.title}
          description={tool.description}
          href={tool.link}
        />
      ))}
    </BaseGrid>
  );
} 