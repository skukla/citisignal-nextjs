'use client';

import { twMerge } from 'tailwind-merge';
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
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    return classes.join(' ');
  };

  return (
    <div className={twMerge(
      'grid',
      getColumnsClass(),
      gapClasses[gap],
      className
    )}>
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          icon={tool.icon}
          title={tool.title}
          description={tool.description}
          href={tool.link}
        />
      ))}
    </div>
  );
} 