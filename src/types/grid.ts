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
 * Props for the Grid component
 */
export interface GridProps {
  children: React.ReactNode;
  columns: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
}