'use client';

import FeatureCard from './FeatureCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';
import type { ElementType } from 'react';

interface Feature {
  icon: ElementType;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FeatureGrid({
  features,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className
}: FeatureGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </BaseGrid>
  );
} 