import { BoltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Accessory, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

/**
 * Complete Accessories page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const accessoriesPageData = {
  /**
   * Accessory products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'ACC-CASE-IPHONE-15',
      name: 'iPhone 15 Clear Case',
      urlKey: 'iphone-15-clear-case',
      description: 'Crystal clear protection for your iPhone 15.',
      price: 29.99,
      currency: '$',
      rating_summary: 92,
      review_count: 245,
      images: [
        {
          url: '/accessories/iphone-15-case.jpg',
          label: 'iPhone 15 Clear Case',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'accessories',
      stock_status: 'in_stock',
      manufacturer: 'Apple',
      compatibility: ['iPhone 15'],
      available_colors: [
        { name: 'Clear', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' }
      ],
      isNew: true,
      isSale: false
    },
    {
      id: '2',
      sku: 'ACC-CHARGER-WIRELESS',
      name: 'Wireless Charging Pad',
      urlKey: 'wireless-charging-pad',
      description: 'Fast wireless charging for compatible devices.',
      price: 39.99,
      currency: '$',
      rating_summary: 88,
      review_count: 156,
      images: [
        {
          url: '/accessories/wireless-charger.jpg',
          label: 'Wireless Charging Pad',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'accessories',
      stock_status: 'in_stock',
      manufacturer: 'CitiSignal',
      compatibility: ['Universal'],
      available_colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' }
      ],
      isNew: false,
      isSale: true
    }
  ] as Accessory[],

  /**
   * Filter configuration for accessories page
   */
  filters: [
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
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for accessories page
   */
  breadcrumbs: [
    { name: 'Accessories' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Phone Accessories',
    description: 'Enhance your mobile experience with our premium selection of phone accessories. From cases to chargers, we have everything to protect and power your devices.',
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