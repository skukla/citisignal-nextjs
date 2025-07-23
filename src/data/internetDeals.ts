import { BaseProduct } from '@/types/commerce';

export interface InternetDeal extends BaseProduct {
  type: 'fiber' | 'cable' | '5g-home' | 'satellite';
  speed: string;
  data_limit: string;
  installation: string;
  equipment_included: string[];
  availability: string;
  contract_length: string;
}

export const internetDealsFilterOptions = {
  type: [
    { id: 'fiber', name: 'Fiber' },
    { id: 'cable', name: 'Cable' },
    { id: '5g-home', name: '5G Home' },
    { id: 'satellite', name: 'Satellite' }
  ],
  speed: [
    { id: 'under-100', name: 'Under 100 Mbps' },
    { id: '100-500', name: '100-500 Mbps' },
    { id: '500-1000', name: '500-1000 Mbps' },
    { id: 'gig-plus', name: 'Gigabit+' }
  ],
  price: [
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: 'over-100', name: 'Over $100' }
  ],
  contract_length: [
    { id: 'no-contract', name: 'No Contract' },
    { id: '12-months', name: '12 Months' },
    { id: '24-months', name: '24 Months' }
  ],
  features: [
    { id: 'unlimited-data', name: 'Unlimited Data' },
    { id: 'free-installation', name: 'Free Installation' },
    { id: 'wifi-included', name: 'WiFi Included' },
    { id: 'business-class', name: 'Business Class' }
  ]
};

// Mock data matching Commerce API structure
export const internetDeals: InternetDeal[] = [
  {
    id: '1',
    sku: 'INTERNET-FIBER-1GIG',
    name: 'Fiber Gigabit Pro',
    url_key: 'fiber-gigabit-pro',
    description: 'Lightning-fast fiber internet with symmetrical gigabit speeds.',
    price: 89.99,
    original_price: 109.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 856,
    media_gallery: [
      {
        url: '/internet/fiber-gig.jpg',
        label: 'Fiber Gigabit Pro Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet',
    stock_status: 'IN_STOCK',
    type: 'fiber',
    speed: '1000/1000 Mbps',
    data_limit: 'Unlimited',
    installation: 'Free Professional Installation',
    equipment_included: ['WiFi 6 Router', 'Network Security'],
    availability: 'Check Address',
    contract_length: '12 months',
    isNew: false,
    isSale: true
  },
  {
    id: '2',
    sku: 'INTERNET-5G-HOME',
    name: '5G Home Internet',
    url_key: '5g-home-internet',
    description: 'Ultra-fast 5G home internet with no data caps.',
    price: 65,
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
    type: '5g-home',
    speed: 'Up to 500 Mbps',
    data_limit: 'Unlimited',
    installation: 'Self-Installation',
    equipment_included: ['5G Router', 'WiFi Extender'],
    availability: 'Check Coverage',
    contract_length: 'No Contract',
    isNew: true,
    isSale: false
  },
  {
    id: '3',
    sku: 'INTERNET-BUSINESS-FIBER',
    name: 'Business Fiber Elite',
    url_key: 'business-fiber-elite',
    description: 'Enterprise-grade fiber internet for businesses with dedicated support.',
    price: 199.99,
    original_price: 249.99,
    currency: 'USD',
    rating_summary: 96,
    review_count: 234,
    media_gallery: [
      {
        url: '/internet/business-fiber.jpg',
        label: 'Business Fiber Elite Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet',
    stock_status: 'IN_STOCK',
    type: 'fiber',
    speed: '2000/2000 Mbps',
    data_limit: 'Unlimited',
    installation: 'Free Professional Installation',
    equipment_included: ['Enterprise Router', 'Network Security Suite', 'Static IP'],
    availability: 'Check Address',
    contract_length: '24 months',
    isNew: false,
    isSale: true
  }
]; 