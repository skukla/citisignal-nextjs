import type { GridColumns } from '@/types/layout';
import type { ThemeSize } from '@/types/theme';

// Grid gap sizes (in Tailwind units)
export type GridGap = ThemeSize;

export interface BaseGridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  centered?: boolean;
  className?: string;
}

// Common grid configurations
export const GRID_CONFIGS = {
  // Content grids (3 columns max)
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
  // Feature grids (4 columns max)
  feature: {
    sm: 1,
    md: 2,
    lg: 4
  },
  // Plan grids (3 columns max with xl breakpoint)
  plan: {
    sm: 1,
    lg: 2,
    xl: 3
  }
} as const;

// Aliases for common grid configurations
export const GRID_ALIASES = {
  product: GRID_CONFIGS.feature,
  solution: GRID_CONFIGS.feature,
  tool: GRID_CONFIGS.feature
} as const; 