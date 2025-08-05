/**
 * Page container background options
 */
export type PageBackground = 'gray' | 'white';

/**
 * Page container max width options
 */
export type PageMaxWidth = '2xl' | '4xl' | '7xl';

/**
 * Page container padding sizes
 */
export type PagePadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Page container padding configuration
 */
export interface PagePaddingConfig {
  x?: PagePadding;
  y?: PagePadding;
}

/**
 * Props for the PageContainer component
 */
export interface PageContainerProps {
  children: React.ReactNode;
  background?: PageBackground;
  maxWidth?: PageMaxWidth;
  padding?: PagePaddingConfig;
  className?: string;
}