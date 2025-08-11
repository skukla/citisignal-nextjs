/**
 * Centralized variant system for consistent component APIs
 */

// Standard button variants used across interactive components
export type ButtonVariant = 
  | 'primary'    // Main CTA, primary brand color
  | 'secondary'  // Secondary actions, gray
  | 'outline'    // Outlined style
  | 'ghost'      // Minimal, no background
  | 'link'       // Link-style button
  | 'yellow'     // Yellow accent button (newsletter, CTAs)
  | 'danger';    // Destructive actions, red

// Standard size variants used across components  
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Status/semantic variants for badges, alerts, etc.
export type StatusVariant = 
  | 'default'    // Default/neutral state
  | 'success'    // Success state, green
  | 'warning'    // Warning state, yellow/orange
  | 'error'      // Error state, red
  | 'info';      // Info state, blue

// Product/commerce specific variants
export type ProductVariant =
  | 'new'        // New product badge
  | 'popular'    // Popular/trending badge
  | 'sale'       // On sale badge
  | 'discount'   // Discount percentage badge
  | 'sold-out';  // Out of stock badge

// Color variants for theming
export type ColorVariant =
  | 'gray'
  | 'purple'     // Brand primary
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red';

// Combined badge variants (most flexible)
export type BadgeVariant = StatusVariant | ProductVariant | ColorVariant;

// Input variants
export type InputVariant = 
  | 'default'
  | 'newsletter' 
  | 'search';

// Link variants
export type LinkVariant = 
  | 'text'       // Standard text link
  | 'button'     // Button-styled link  
  | 'icon';      // Icon link

// Navigation variants
export type NavigationVariant = 'desktop' | 'mobile';