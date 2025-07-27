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

export interface GridConfig {
  columns: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

export interface SectionConfig {
  maxWidth?: boolean;
  padding?: boolean;
  bgColor?: string;
  className?: string;
} 