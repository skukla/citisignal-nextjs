import { Phone, Watch, Accessory, Plan } from '@/types/commerce';
import type { InternetDeal } from '@/data/internetDeals';
import type { StreamingService } from '@/data/streaming';

export type ProductType = Phone | Watch | Accessory | Plan | InternetDeal | StreamingService;

export interface ProductImageProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export interface ProductBadgeProps {
  isNew?: boolean;
  isSale?: boolean;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
}

export interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  currency: string;
}

export interface ProductColorProps {
  name: string;
  hex: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface ProductActionsProps {
  productId: string;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart?: () => void;
}

export interface ProductCardContextValue {
  product: ProductType;
  isWishlisted: boolean;
  selectedColor?: string;
  toggleWishlist: () => void;
  selectColor: (colorName: string) => void;
}

// Compound component props
export interface ProductCardRootProps {
  product: ProductType;
  className?: string;
  children?: React.ReactNode;
}

export interface ProductCardImageProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export interface ProductCardBadgesProps {
  className?: string;
}

export interface ProductCardInfoProps {
  className?: string;
  showDescription?: boolean;
}

export interface ProductCardPriceProps {
  className?: string;
  showSavings?: boolean;
}

export interface ProductCardColorsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ProductCardActionsProps {
  className?: string;
  showQuickAdd?: boolean;
}

// Type Guards
export function hasManufacturer(product: ProductType): product is Phone | Watch | Accessory {
  return 'manufacturer' in product;
}

export function hasColors(product: ProductType): product is Phone | Watch | Accessory {
  return 'available_colors' in product && Array.isArray(product.available_colors);
}