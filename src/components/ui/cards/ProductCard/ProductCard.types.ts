import { Phone, Watch, Accessory, Plan } from '@/types/commerce';
import type { InternetDeal } from '@/data/pages/internet-deals';
import type { StreamingService } from '@/data/pages/streaming';
import type { GiftCard } from '@/data/pages/gift-cards';
import type { BaseComponentProps } from '@/types/ui';

export type ProductType = Phone | Watch | Accessory | Plan | InternetDeal | StreamingService | GiftCard;

export interface ProductCardContextValue {
  product: ProductType;
  isWishlisted: boolean;
  selectedColor?: string;
  toggleWishlist: () => void;
  selectColor: (colorName: string) => void;
}

// Component props
export interface ProductCardRootProps extends BaseComponentProps {
  product: ProductType;
}

export interface ProductCardImageProps extends BaseComponentProps {
  width?: number;
  height?: number;
  priority?: boolean;
}

export type ProductCardBadgesProps = BaseComponentProps;

export interface ProductCardInfoProps extends BaseComponentProps {
  showDescription?: boolean;
}

export interface ProductCardPriceProps extends BaseComponentProps {
  showSavings?: boolean;
}

export interface ProductCardColorsProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ProductCardActionsProps extends BaseComponentProps {
  showQuickAdd?: boolean;
}

// Type Guards
export function hasManufacturer(product: ProductType): product is Phone | Watch | Accessory {
  return 'manufacturer' in product;
}

export function hasColors(product: ProductType): product is Phone | Watch | Accessory {
  return 'available_colors' in product && Array.isArray(product.available_colors);
}

// Compound component type
export interface ProductCardComponent {
  Root: React.FC<ProductCardRootProps>;
  Image: React.FC<ProductCardImageProps>;
  Badges: React.FC<ProductCardBadgesProps>;
  Info: React.FC<ProductCardInfoProps>;
  Price: React.FC<ProductCardPriceProps>;
  Colors: React.FC<ProductCardColorsProps>;
  Actions: React.FC<ProductCardActionsProps>;
}