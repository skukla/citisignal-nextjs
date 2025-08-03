import { ClockIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Watch, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Filter configuration for watches page
 * Single layer structure with UI metadata built-in
 */
export const watchFilters = [
  {
    title: 'Manufacturer',
    key: 'manufacturer',
    type: 'checkbox' as const,
    options: [
      { id: 'apple', name: 'Apple' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'citisignal', name: 'CitiSignal' }
    ]
  },
  {
    title: 'Sizes',
    key: 'sizes',
    type: 'checkbox' as const,
    options: [
      { id: '41mm', name: '41mm' },
      { id: '45mm', name: '45mm' },
      { id: '49mm', name: '49mm' }
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
      { id: 'under-300', name: 'Under $300' },
      { id: '300-500', name: '$300 - $500' },
      { id: 'over-500', name: 'Over $500' }
    ]
  },
  {
    title: 'Features',
    key: 'features',
    type: 'checkbox' as const,
    options: [
      { id: 'cellular', name: 'Cellular' },
      { id: 'gps', name: 'GPS' },
      { id: 'health-tracking', name: 'Health Tracking' },
      { id: 'voice-assistant', name: 'Voice Assistant' }
    ]
  }
] as FilterSection[];

/**
 * Mock watches data
 */
export const watches: Watch[] = [
  {
    id: '1',
    sku: 'WATCH-APPLE-S9-41',
    name: 'Apple Watch Series 9',
    url_key: 'apple-watch-series-9',
    description: 'The most advanced Apple Watch with S9 chip, Double Tap gesture, and advanced health features.',
    price: 399,
    original_price: 429,
    currency: 'USD',
    rating_summary: 92,
    review_count: 85,
    media_gallery: [
      {
        url: '/watches/apple-watch-s9.jpg',
        label: 'Apple Watch Series 9 Midnight Aluminum',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'watches',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    sizes: ['41mm', '45mm'],
    connectivity: 'GPS + Cellular',
    battery_life: 'Up to 18 hours',
    water_resistant: '50m',
    available_colors: [
      { name: 'Midnight', hex: '#2B323B' },
      { name: 'Starlight', hex: '#E7E1DC' },
      { name: 'Silver', hex: '#F1F3EE' },
      { name: 'Pink', hex: '#FDE2DE' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    sku: 'WATCH-SAMSUNG-GW6-45',
    name: 'Galaxy Watch 6 Classic',
    url_key: 'galaxy-watch-6-classic',
    description: 'Premium smartwatch with rotating bezel, advanced health tracking, and Wear OS.',
    price: 399,
    original_price: 449,
    currency: 'USD',
    rating_summary: 88,
    review_count: 65,
    media_gallery: [
      {
        url: '/watches/galaxy-watch-6.jpg',
        label: 'Galaxy Watch 6 Classic Black',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'watches',
    stock_status: 'IN_STOCK',
    manufacturer: 'Samsung',
    sizes: ['43mm', '47mm'],
    connectivity: 'GPS + Cellular',
    battery_life: 'Up to 40 hours',
    water_resistant: '5ATM + IP68',
    available_colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Silver', hex: '#F1F3EE' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '3',
    sku: 'WATCH-CS-SMART-1',
    name: 'CitiSignal SmartWatch Pro',
    url_key: 'citisignal-smartwatch-pro',
    description: 'Feature-rich smartwatch with extended battery life and comprehensive health tracking.',
    price: 299,
    currency: 'USD',
    rating_summary: 85,
    review_count: 32,
    media_gallery: [
      {
        url: '/watches/citisignal-watch.jpg',
        label: 'CitiSignal SmartWatch Pro Graphite',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'watches',
    stock_status: 'IN_STOCK',
    manufacturer: 'CitiSignal',
    sizes: ['45mm'],
    connectivity: 'GPS + Cellular',
    battery_life: 'Up to 7 days',
    water_resistant: '10ATM',
    available_colors: [
      { name: 'Graphite', hex: '#5F5E5A' },
      { name: 'Navy', hex: '#1F2330' },
      { name: 'Gold', hex: '#F8E8D1' }
    ],
    isNew: true,
    isSale: false
  }
];

/**
 * Centralized configuration for the Watches page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const watchesPageConfig = {
  /**
   * Filter configuration for watches page
   */
  filters: watchFilters,

  /**
   * Breadcrumb navigation for watches page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Watches' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Smartwatches',
    description: 'Stay connected and track your fitness with our selection of smartwatches. From health monitoring to seamless connectivity, find the perfect wearable technology for your lifestyle.',
    icon: ClockIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search watches...',
    itemLabel: 'watches'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No watches found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};