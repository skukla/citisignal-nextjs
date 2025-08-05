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

export type ProductCardPriceProps = BaseComponentProps;

export type ProductCardColorsProps = BaseComponentProps;

export interface ProductCardActionsProps extends BaseComponentProps {
  product: {
    id: string;
    name: string;
    price: number;
    images?: string[];
    stock_status?: 'in_stock' | 'out_of_stock';
  };
}

// Type guards
export function hasColors(product: ProductType): product is Phone | Watch | Accessory {
  return 'available_colors' in product && Array.isArray(product.available_colors);
}

export function hasManufacturer(product: ProductType): product is Phone | Watch {
  return 'manufacturer' in product && typeof product.manufacturer === 'string';
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