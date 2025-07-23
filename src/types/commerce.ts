export interface BaseProduct {
  // Basic product info
  id: string;
  sku: string;
  name: string;
  url_key: string;
  description?: string;
  
  // Pricing
  price: number;
  original_price?: number;
  currency: string;
  
  // Ratings & Reviews
  rating_summary: number; // 0-100 scale
  review_count: number;
  
  // Media
  media_gallery: Array<{
    url: string;
    label: string;
    roles: string[];
  }>;
  
  // Categories & Stock
  category: string;
  stock_status: 'IN_STOCK' | 'OUT_OF_STOCK';

  // Flags
  isNew?: boolean;
  isSale?: boolean;
}

// Custom attribute interfaces
export interface PhoneAttributes {
  manufacturer: 'Apple' | 'Samsung' | 'CitiSignal';
  memory: string[];
  extended_capacity_5g: boolean;
  extended_range_5g: boolean;
  available_colors: Array<{
    name: string;
    hex: string;
  }>;
}

export interface WatchAttributes {
  manufacturer: 'Apple' | 'Samsung' | 'CitiSignal';
  sizes: string[];
  connectivity: string;
  battery_life: string;
  water_resistant: string;
  available_colors: Array<{
    name: string;
    hex: string;
  }>;
}

export interface AccessoryAttributes {
  manufacturer: string;
  compatibility: string[];
  available_colors: Array<{
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
  network_priority: 'premium' | 'standard' | 'basic';
  contract_required: boolean;
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
  { id: 'white', name: 'White', hex: '#f9f9f9' }
]; 