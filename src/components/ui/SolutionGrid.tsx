'use client';

import Grid from './Grid';
import SolutionCard from './SolutionCard';
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
  className
}: SolutionGridProps) {
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