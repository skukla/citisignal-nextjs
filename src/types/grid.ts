import type { GridColumns } from '@/components/ui/layout/BaseGrid';

export type GridGap = 'sm' | 'md' | 'lg';

export interface BaseGridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  centered?: boolean;
  className?: string;
}

// Common grid configurations
export const GRID_CONFIGS = {
  article: {
    sm: 1,
    md: 2,
    lg: 3
  },
  benefit: {
    sm: 1,
    md: 3,
    lg: 3
  },
  buyingGuide: {
    sm: 1,
    md: 2
  },
  product: {
    sm: 1,
    md: 2,
    lg: 4
  },
  feature: {
    sm: 1,
    md: 2,
    lg: 4
  },
  plan: {
    sm: 1,
    lg: 2,
    xl: 3
  },
  solution: {
    sm: 1,
    md: 2,
    lg: 4
  },
  tool: {
    sm: 1,
    md: 2,
    lg: 4
  }
} as const; 