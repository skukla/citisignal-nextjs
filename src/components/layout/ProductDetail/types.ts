/**
 * Type definitions for ProductDetail components
 * Follows the same pattern as ProductPage types
 */

import type { ProductDetail } from '@/types/commerce';
import type { ReactNode } from 'react';

// Base props interface for all ProductDetail components
interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface ProductDetailContextValue {
  product: ProductDetail | null;
  loading: boolean;
  error?: Error;
  isValidating: boolean;
}

export interface ProductDetailProviderProps {
  children: ReactNode;
  productSlug: string;
}

// Component prop interfaces following established patterns
export interface ProductDetailBackgroundProps extends BaseProps {
  color?: 'white' | 'gray';
}

export type ProductDetailContainerProps = BaseProps;

export type ProductDetailLayoutProps = BaseProps;

export interface ProductDetailBreadcrumbsProps {
  className?: string;
}

export interface ProductDetailGalleryProps {
  className?: string;
  selectedVariant?: ProductDetail['variants'][0] | null;
}

export interface ProductDetailInfoProps extends BaseProps {
  onVariantChange?: (variant: ProductDetail['variants'][0] | null) => void;
}

export interface ProductDetailHeaderProps {
  className?: string;
  selectedVariant?: ProductDetail['variants'][0] | null;
  allAttributesSelected?: boolean;
}

export interface ProductDetailPriceProps {
  className?: string;
  selectedVariant?: ProductDetail['variants'][0] | null;
}

export interface ProductDetailVariantsProps {
  className?: string;
  onSelectionChange?: (selectedOptions: Record<string, string>, allSelected: boolean) => void;
}

export interface ProductDetailActionsProps {
  className?: string;
  selectedOptions?: Record<string, string>;
  allAttributesSelected?: boolean;
}

export type ProductDetailTabsProps = BaseProps;

export interface ProductDetailDescriptionProps {
  className?: string;
}

export interface ProductDetailSpecificationsProps {
  className?: string;
}

export interface ProductDetailReviewsProps {
  className?: string;
}

export interface ProductDetailRelatedProductsProps {
  className?: string;
}
