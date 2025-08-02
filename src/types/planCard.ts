/**
 * Type definitions for PlanCard compound components
 */

/**
 * Props for PlanCardHeader component
 * Extracted due to complexity (8 props) and reusability potential
 */
export interface PlanCardHeaderProps {
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  onWishlistToggle?: (saved: boolean) => void;
  className?: string;
}