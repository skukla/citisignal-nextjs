'use client';

import SolutionCard from './SolutionCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';
import type { HeroIcon } from '@/types/hero-icons';

interface Solution {
  icon: HeroIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
}

interface SolutionGridProps {
  solutions: Solution[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SolutionGrid({
  solutions,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className
}: SolutionGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
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
    </BaseGrid>
  );
} 