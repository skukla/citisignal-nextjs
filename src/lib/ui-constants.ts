/**
 * UI Constants - Repeated values across components
 * Provides consistency for animations, transitions, and responsive patterns
 */

// Animation & Transition Constants
export const ANIMATION_DURATIONS = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500'
} as const;

export const TRANSITION_CLASSES = {
  // Most common transition combinations
  default: 'transition-all duration-200',
  shadow: 'transition-shadow duration-300',
  transform: 'transition-transform duration-200',
  opacity: 'transition-opacity duration-300',
  colors: 'transition-colors duration-200'
} as const;

// Common Grid Column Configurations
export const GRID_COLUMNS = {
  // Most frequently used grid patterns
  responsive2: { sm: 1, md: 2 },
  responsive3: { sm: 1, md: 2, lg: 3 },
  responsive4: { sm: 1, md: 2, lg: 4 },
  responsive6: { sm: 1, md: 3, lg: 6 },
  
  // Specific patterns for different content types
  articles: { sm: 1, md: 3 },
  products: { sm: 1, md: 2, lg: 4 },
  accessories: { sm: 2, md: 4 },
  buyingGuides: { sm: 1, md: 2 },
  techReviews: { sm: 1, md: 2, lg: 3 },
  tips: { sm: 1, md: 2, lg: 3 },
  tools: { sm: 1, md: 2, lg: 4 },
  solutions: { sm: 1, md: 2, lg: 4 },
  benefits: { sm: 1, md: 2, lg: 4 }
} as const;

// Common Responsive Text Sizes
export const TEXT_SIZES = {
  heading: {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl', 
    lg: 'text-4xl md:text-5xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl'
  }
} as const;

// Common Gaps and Spacing
export const LAYOUT_SPACING = {
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  sectionGap: 'gap-8',
  gridGap: 'gap-8',
  flexGap: {
    sm: 'gap-1 sm:gap-2 lg:gap-4',
    md: 'gap-4',
    lg: 'gap-8'
  }
} as const;

export type AnimationDuration = keyof typeof ANIMATION_DURATIONS;
export type TransitionClass = keyof typeof TRANSITION_CLASSES;
export type GridColumnConfig = keyof typeof GRID_COLUMNS;
export type TextSizeConfig = keyof typeof TEXT_SIZES.heading;