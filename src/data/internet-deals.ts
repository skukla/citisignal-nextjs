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

export const internetDeals: InternetDeal[] = [
  {
    id: '1',
    sku: 'NET-FIBER-1000',
    name: 'Fiber 1000',
    url_key: 'fiber-1000',
    description: 'Lightning-fast fiber internet with symmetrical gigabit speeds.',
    price: 79.99,
    original_price: 99.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 856,
    media_gallery: [
      {
        url: '/internet/fiber-1000.jpg',
        label: 'Fiber 1000 Internet Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet',
    stock_status: 'IN_STOCK',
    speed: '1000 Mbps',
    data_limit: 'Unlimited',
    contract_length: '12 Months',
    setup_fee: 0,
    equipment_included: true,
    features: ['Unlimited Data', 'WiFi 6 Router Included', 'No Setup Fee', 'Price Lock Guarantee'],
    isNew: false,
    isSale: true
  },
  {
    id: '2',
    sku: 'NET-5G-HOME',
    name: '5G Home Internet',
    url_key: '5g-home-internet',
    description: 'Ultra-fast 5G home internet with no data caps.',
    price: 59.99,
    currency: 'USD',
    rating_summary: 88,
    review_count: 445,
    media_gallery: [
      {
        url: '/internet/5g-home.jpg',
        label: '5G Home Internet Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet',
    stock_status: 'IN_STOCK',
    speed: '300 Mbps',
    data_limit: 'Unlimited',
    contract_length: 'None',
    setup_fee: 0,
    equipment_included: true,
    features: ['Unlimited Data', '5G Router Included', 'Self-Install', 'No Annual Contract'],
    isNew: true,
    isSale: false
  },
  {
    id: '3',
    sku: 'NET-CABLE-500',
    name: 'Cable 500',
    url_key: 'cable-500',
    description: 'High-speed cable internet perfect for streaming and gaming.',
    price: 64.99,
    original_price: 74.99,
    currency: 'USD',
    rating_summary: 86,
    review_count: 623,
    media_gallery: [
      {
        url: '/internet/cable-500.jpg',
        label: 'Cable 500 Internet Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet',
    stock_status: 'IN_STOCK',
    speed: '500 Mbps',
    data_limit: 'Unlimited',
    contract_length: '24 Months',
    setup_fee: 0,
    equipment_included: true,
    features: ['Unlimited Data', 'WiFi Router Included', 'Professional Installation', 'Price Lock Guarantee'],
    isNew: false,
    isSale: true
  }
]; 