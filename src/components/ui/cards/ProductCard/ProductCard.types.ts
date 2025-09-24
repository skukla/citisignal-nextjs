import { Phone, Watch, Accessory, Plan } from '@/types/commerce';
import type { StreamingService } from '@/data/route-groups/products/streaming';
import type { GiftCard } from '@/data/route-groups/products/gift-cards';
import type { BaseComponentProps } from '@/types/ui';

export type ProductType = Phone | Watch | Accessory | Plan | StreamingService | GiftCard;

// Enhanced product type with configurable options (from API)
export interface EnhancedProductType extends ProductType {
  configurable_options?: Array<{
    label: string;
    attribute_code: string;
    values: Array<{
      label: string;
      value: string;
      swatch_data?: {
        type: string;
        value: string;
      };
    }>;
  }>;
  isConfigurable?: boolean;
}

export interface ProductCardContextValue {
  product: ProductType;
  isWishlisted: boolean;
  toggleWishlist: () => void;
}

// Component props
export interface ProductCardRootProps extends BaseComponentProps {
  product: ProductType;
  dataSource?: 'catalog' | 'search';
}

export interface ProductCardImageProps extends BaseComponentProps {
  width?: number;
  height?: number;
  priority?: boolean;
}

export type ProductCardBadgesProps = BaseComponentProps;

export type ProductCardInfoProps = BaseComponentProps;

export interface ProductCardPriceProps extends BaseComponentProps {
  showSavings?: boolean;
}

export interface ProductCardColorsProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
}

export type ProductCardActionsProps = BaseComponentProps;

// Type guards
export function hasConfigurableOptions(product: ProductType): boolean {
  return (
    'configurable_options' in product &&
    Array.isArray(product.configurable_options) &&
    product.configurable_options.length > 0
  );
}

export function hasManufacturer(product: ProductType): product is Phone | Watch | Accessory {
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
