import type { ThemeTextSize, ThemeSize } from './theme';

export interface ComparisonHeader {
  label: React.ReactNode;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface GridColumns {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export type GridGap = ThemeSize;
export type FeatureSpacing = ThemeSize;

export interface GridConfig {
  columns: GridColumns;
  gap: GridGap;
}

export const GRID_CONFIGS = {
  features: {
    columns: {
      sm: 1,
      md: 2,
      lg: 3
    },
    gap: 'lg' as GridGap
  },
  articles: {
    columns: {
      sm: 1,
      md: 2,
      lg: 3
    },
    gap: 'lg' as GridGap
  },
  plans: {
    columns: {
      sm: 1,
      md: 2,
      lg: 3
    },
    gap: 'lg' as GridGap
  }
} as const;

export interface SectionHeaderConfig {
  title: string;
  description?: string;
  action?: React.ReactNode;
  centered?: boolean;
  titleSize?: ThemeSize;
  descriptionSize?: ThemeSize;
  className?: string;
}

export interface SectionConfig {
  bgColor?: string;
  maxWidth?: boolean;
  padding?: boolean;
  className?: string;
} 