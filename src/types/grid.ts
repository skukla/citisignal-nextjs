/**
 * Responsive value configuration
 */
export type ResponsiveValue<T> = {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

/**
 * Grid gap sizes
 */
export type GridGap = 'sm' | 'md' | 'lg';

/**
 * Grid alignment options
 */
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Props for the Grid component
 */
export interface GridProps {
  children: React.ReactNode;
  columns: ResponsiveValue<number>;
  gap?: GridGap;
  align?: GridAlign;
  className?: string;
}