import { GlobeAltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { BaseProduct } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

export interface InternetDeal extends BaseProduct {
  type: 'fiber' | 'cable' | '5g-home' | 'satellite';
  speed: string;
  data_limit: string;
  installation: string;
  equipment_included: string[];
  availability: string;
  contract_length: string;
}

/**
 * Internet deals filter options
 */
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
  ]
};

/**
 * Mock internet deals data
 */
export const internetDeals: InternetDeal[] = [
  {
    id: '1',
    sku: 'INTERNET-FIBER-1GIG',
    name: 'Fiber Gigabit Pro',
    url_key: 'fiber-gigabit-pro',
    description: 'Lightning-fast fiber internet with symmetrical upload and download speeds.',
    price: 79.99,
    original_price: 99.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 450,
    media_gallery: [
      {
        url: '/internet/fiber-gigabit.jpg',
        label: 'Fiber Gigabit Pro',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet-deals',
    stock_status: 'IN_STOCK',
    type: 'fiber',
    speed: '1000 Mbps',
    data_limit: 'Unlimited',
    installation: 'Professional installation included',
    equipment_included: ['Fiber Modem', 'WiFi 6 Router'],
    availability: 'Select areas',
    contract_length: '12 months',
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    sku: 'INTERNET-5G-HOME-500',
    name: '5G Home Internet Ultra',
    url_key: '5g-home-internet-ultra',
    description: 'Wireless 5G home internet with no data caps and easy setup.',
    price: 65,
    currency: 'USD',
    rating_summary: 88,
    review_count: 280,
    media_gallery: [
      {
        url: '/internet/5g-home.jpg',
        label: '5G Home Internet Ultra',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet-deals',
    stock_status: 'IN_STOCK',
    type: '5g-home',
    speed: 'Up to 500 Mbps',
    data_limit: 'Unlimited',
    installation: 'Self-installation kit',
    equipment_included: ['5G Gateway', 'Power Adapter'],
    availability: '5G coverage areas',
    contract_length: 'No contract',
    isNew: true,
    isSale: false
  },
  {
    id: '3',
    sku: 'INTERNET-CABLE-200',
    name: 'Cable Internet Plus',
    url_key: 'cable-internet-plus',
    description: 'Reliable cable internet perfect for streaming and working from home.',
    price: 49.99,
    currency: 'USD',
    rating_summary: 86,
    review_count: 350,
    media_gallery: [
      {
        url: '/internet/cable-plus.jpg',
        label: 'Cable Internet Plus',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'internet-deals',
    stock_status: 'IN_STOCK',
    type: 'cable',
    speed: '200 Mbps',
    data_limit: 'Unlimited',
    installation: 'Free professional installation',
    equipment_included: ['Cable Modem', 'WiFi Router'],
    availability: 'Most areas',
    contract_length: '24 months',
    isNew: false,
    isSale: false
  }
];

/**
 * Centralized configuration for the Internet Deals page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const internetDealsPageConfig = {
  /**
   * Filter configuration for internet deals page
   */
  filters: [
    {
      title: 'Type',
      key: 'type',
      options: internetDealsFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Speed',
      key: 'speed',
      options: internetDealsFilterOptions.speed,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: internetDealsFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Contract Length',
      key: 'contract_length',
      options: internetDealsFilterOptions.contract_length,
      type: 'checkbox' as const
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for internet deals page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Internet Deals' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Internet Deals',
    description: 'Find the best internet deals and packages for your home or business. Compare speeds, prices, and features to get the perfect connectivity solution at an unbeatable price.',
    icon: GlobeAltIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search internet deals...',
    itemLabel: 'deals'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No internet deals found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};