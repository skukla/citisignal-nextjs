export interface BaseProduct {
  id: string;
  sku: string;
  name: string;
  urlKey: string;
  price: string;
  originalPrice?: string;
  discountPercent?: number;
  image?: {
    url: string;
    label: string;
  };
  inStock: boolean;
  manufacturer?: string;
}

// Extended product type for Product Detail Pages
export interface ProductDetail extends BaseProduct {
  stockLevel?: number;
  description?: string;
  shortDescription?: string;
  metaTitle?: string;
  metaDescription?: string;

  // Enhanced media gallery
  images?: Array<{
    url: string;
    altText: string;
    type?: string;
    position?: number;
  }>;

  // Product attributes and specifications
  attributes?: Array<{
    key: string;
    label: string;
    value: string;
    type?: string;
  }>;

  // Configurable options (colors, sizes, etc.)
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

  // Product variants
  variants?: Array<{
    id: string;
    sku: string;
    attributes: Record<string, string>;
    price: string;
    originalPrice?: string;
    inStock: boolean;
    stockLevel?: number;
  }>;

  // Reviews and ratings
  reviews?: {
    rating_summary: number;
    review_count: number;
  };

  // Related products
  related_products?: BaseProduct[];
  cross_sell_products?: BaseProduct[];

  // Navigation
  breadcrumbs?: {
    items: Array<{
      name: string;
      urlPath: string;
    }>;
  };

  // Categories
  categories?: Array<{
    id: string;
    name: string;
    urlKey: string;
    urlPath: string;
  }>;
}

// Facet types for filtering
export interface FacetOption {
  label: string;
  value: string;
  count: number;
}

export interface Facet {
  attribute: string;
  label: string;
  options: FacetOption[];
}

// Custom attribute interfaces
export interface PhoneAttributes {
  memory?: string[];
  colors?: Array<{
    name: string;
    hex: string;
  }>;
}

export interface WatchAttributes {
  sizes?: string[];
  connectivity?: string;
  batteryLife?: string;
  waterResistant?: string;
  colors?: Array<{
    name: string;
    hex: string;
  }>;
}

export interface AccessoryAttributes {
  compatibility?: string[];
  colors?: Array<{
    name: string;
    hex: string;
  }>;
}

export interface PlanAttributes {
  type: 'individual' | 'family' | 'unlimited' | 'prepaid';
  data: string;
  talk: string;
  text: string;
  hotspot: string;
  streaming: string[];
  networkPriority: 'premium' | 'standard' | 'basic';
  contractRequired: boolean;
}

// Product type interfaces
export interface Phone extends BaseProduct, PhoneAttributes {}
export interface Watch extends BaseProduct, WatchAttributes {}
export interface Accessory extends BaseProduct, AccessoryAttributes {}
export interface Plan extends BaseProduct, PlanAttributes {}

// Common color options
export const colorOptions = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'blue', name: 'Blue', hex: '#286885' },
  { id: 'burgundy', name: 'Burgundy', hex: '#64464e' },
  { id: 'cream', name: 'Cream', hex: '#e4e0bf' },
  { id: 'gold', name: 'Gold', hex: '#f8e8d1' },
  { id: 'graphite', name: 'Graphite', hex: '#5f5e5a' },
  { id: 'green', name: 'Green', hex: '#425456' },
  { id: 'lavender', name: 'Lavender', hex: '#cec0de' },
  { id: 'midnight', name: 'Midnight', hex: '#2b323b' },
  { id: 'navy', name: 'Navy', hex: '#1f2330' },
  { id: 'phantom-black', name: 'Phantom Black', hex: '#08080a' },
  { id: 'phantom-white', name: 'Phantom White', hex: '#fcfcfc' },
  { id: 'pink', name: 'Pink', hex: '#fde2de' },
  { id: 'pink-gold', name: 'Pink Gold', hex: '#f6ddda' },
  { id: 'purple', name: 'Purple', hex: '#bcb3ea' },
  { id: 'red', name: 'Red', hex: '#b7072a' },
  { id: 'sierra-blue', name: 'Sierra Blue', hex: '#adc6dc' },
  { id: 'silver', name: 'Silver', hex: '#f1f3ee' },
  { id: 'starlight', name: 'Starlight', hex: '#e7e1dc' },
  { id: 'white', name: 'White', hex: '#f9f9f9' },
];
