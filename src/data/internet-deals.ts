import { BaseProduct } from '@/types/commerce';
import { InternetFilterOptions } from '@/types/filters';

export interface InternetDeal extends BaseProduct {
  speed: string;
  data_limit: string;
  contract_length: string;
  setup_fee: number;
  equipment_included: boolean;
  features: string[];
}

export const internetDealsFilterOptions: InternetFilterOptions = {
  type: [
    { id: 'fiber', name: 'Fiber' },
    { id: '5g-home', name: '5G Home' },
    { id: 'cable', name: 'Cable' },
    { id: 'dsl', name: 'DSL' }
  ],
  speed: [
    { id: 'under-100', name: 'Under 100 Mbps' },
    { id: '100-500', name: '100-500 Mbps' },
    { id: '500-1000', name: '500-1000 Mbps' },
    { id: 'over-1000', name: 'Over 1000 Mbps' }
  ],
  price: [
    { id: 'under-50', name: 'Under $50' },
    { id: '50-75', name: '$50 - $75' },
    { id: '75-100', name: '$75 - $100' },
    { id: 'over-100', name: 'Over $100' }
  ],
  contract_length: [
    { id: 'none', name: 'No Contract' },
    { id: '12-month', name: '12 Months' },
    { id: '24-month', name: '24 Months' }
  ],
  features: [
    { id: 'unlimited-data', name: 'Unlimited Data' },
    { id: 'wifi-included', name: 'WiFi Equipment Included' },
    { id: 'no-setup-fee', name: 'No Setup Fee' },
    { id: 'price-lock', name: 'Price Lock Guarantee' }
  ]
};

// Mock data matching Commerce API structure
export const internetDeals: InternetDeal[] = [
  // ... existing internet deals data ...
]; 