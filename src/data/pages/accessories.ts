import { BoltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Accessory, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Filter configuration for accessories page
 * Single layer structure with UI metadata built-in
 */
export const accessoryFilters = [
  {
    title: 'Manufacturer',
    key: 'manufacturer',
    type: 'checkbox' as const,
    options: [
      { id: 'apple', name: 'Apple' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'citisignal', name: 'CitiSignal' },
      { id: 'belkin', name: 'Belkin' },
      { id: 'anker', name: 'Anker' }
    ]
  },
  {
    title: 'Compatibility',
    key: 'compatibility',
    type: 'checkbox' as const,
    options: [
      { id: 'iphone', name: 'iPhone' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'android', name: 'Android' },
      { id: 'universal', name: 'Universal' }
    ]
  },
  {
    title: 'Colors',
    key: 'colors',
    type: 'checkbox' as const,
    options: colorOptions
  },
  {
    title: 'Price Range',
    key: 'price',
    type: 'checkbox' as const,
    options: [
      { id: 'under-25', name: 'Under $25' },
      { id: '25-50', name: '$25 - $50' },
      { id: '50-100', name: '$50 - $100' },
      { id: 'over-100', name: 'Over $100' }
    ]
  }
] as FilterSection[];

/**
 * Mock data matching Commerce API structure
 */
export const accessories: Accessory[] = [
  {
    id: '1',
    sku: 'ACC-MAGSAFE-CHARGER',
    name: 'MagSafe Wireless Charger',
    url_key: 'magsafe-wireless-charger',
    description: 'Fast wireless charging with perfect magnetic alignment for iPhone.',
    price: 39.99,
    currency: 'USD',
    rating_summary: 92,
    review_count: 450,
    media_gallery: [
      {
        url: '/accessories/magsafe-charger.jpg',
        label: 'MagSafe Wireless Charger White',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    compatibility: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15'],
    available_colors: [
      { name: 'White', hex: '#F9F9F9' }
    ],
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'ACC-FAST-CHARGER-25W',
    name: '25W Fast Charging Adapter',
    url_key: '25w-fast-charging-adapter',
    description: 'Super fast charging for all your devices with USB-C power delivery.',
    price: 19.99,
    currency: 'USD',
    rating_summary: 88,
    review_count: 325,
    media_gallery: [
      {
        url: '/accessories/fast-charger.jpg',
        label: '25W Fast Charging Adapter',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'Samsung',
    compatibility: ['Universal'],
    available_colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#F9F9F9' }
    ],
    isNew: false,
    isSale: true
  },
  {
    id: '3',
    sku: 'ACC-CS-POWERBANK-20K',
    name: 'CitiSignal PowerCore 20000mAh',
    url_key: 'citisignal-powercore-20000',
    description: 'High-capacity portable charger with dual USB-C ports and fast charging.',
    price: 49.99,
    original_price: 59.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 128,
    media_gallery: [
      {
        url: '/accessories/powerbank.jpg',
        label: 'CitiSignal PowerCore 20000mAh Navy',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'CitiSignal',
    compatibility: ['Universal'],
    available_colors: [
      { name: 'Navy', hex: '#1F2330' },
      { name: 'Graphite', hex: '#5F5E5A' }
    ],
    isNew: true,
    isSale: true
  }
];

/**
 * Centralized configuration for the Accessories page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const accessoriesPageConfig = {
  /**
   * Filter configuration for accessories page
   */
  filters: accessoryFilters,

  /**
   * Breadcrumb navigation for accessories page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Accessories' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Phone Accessories',
    description: 'Enhance your phone experience with our collection of premium accessories. From protective cases to wireless chargers, find everything you need to get the most out of your device.',
    icon: BoltIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search accessories...',
    itemLabel: 'accessories'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No accessories found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};