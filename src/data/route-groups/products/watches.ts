import { ClockIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Watch, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';
/**
 * Complete Watches page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const watchesPageData = {
  /**
   * Watch products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'WATCH-APPLE-SERIES-9',
      name: 'Apple Watch Series 9',
      urlKey: 'apple-watch-series-9',
      description: 'The most advanced Apple Watch yet with new health features.',
      price: 399,
      currency: '$',
      rating_summary: 94,
      review_count: 567,
      images: [
        {
          url: '/watches/apple-watch-series-9.jpg',
          label: 'Apple Watch Series 9',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'watches',
      stock_status: 'in_stock',
      manufacturer: 'Apple',
      sizes: ['41mm', '45mm'],
      connectivity: 'GPS + Cellular',
      available_colors: [
        { name: 'Pink', hex: '#FFC0CB' },
        { name: 'Midnight', hex: '#191970' },
        { name: 'Starlight', hex: '#F5F5DC' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Red', hex: '#FF0000' }
      ],
      battery_life: 'Up to 18 hours',
      water_resistant: '50 meters',
      isNew: true,
      isSale: false
    },
    {
      id: '2',
      sku: 'WATCH-SAMSUNG-GALAXY-6',
      name: 'Samsung Galaxy Watch 6',
      urlKey: 'samsung-galaxy-watch-6',
      description: 'Advanced health monitoring with sleek design.',
      price: 329,
      currency: '$',
      rating_summary: 89,
      review_count: 432,
      images: [
        {
          url: '/watches/samsung-galaxy-watch-6.jpg',
          label: 'Samsung Galaxy Watch 6',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'watches',
      stock_status: 'in_stock',
      manufacturer: 'Samsung',
      sizes: ['40mm', '44mm'],
      connectivity: 'GPS + LTE',
      available_colors: [
        { name: 'Graphite', hex: '#36454F' },
        { name: 'Silver', hex: '#C0C0C0' },
        { name: 'Gold', hex: '#FFD700' }
      ],
      battery_life: 'Up to 40 hours',
      water_resistant: '50 meters',
      isNew: false,
      isSale: true
    }
  ] as Watch[],

  /**
   * Filter configuration for watches page
   */
  filters: [
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
        { id: 'gps', name: 'GPS' },
        { id: 'cellular', name: 'Cellular' },
        { id: 'heart-rate', name: 'Heart Rate Monitor' },
        { id: 'water-resistant', name: 'Water Resistant' }
      ]
    }
  ] as FilterSection[],

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
    title: 'Watches',
    description: 'Stay connected and track your health with our collection of smart watches. From fitness tracking to notifications, find the perfect wearable technology.',
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