'use client';

import { twMerge } from 'tailwind-merge';
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
    </div>
  );
} 