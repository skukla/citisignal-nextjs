import { GlobeAltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { BaseProduct } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

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
 * Complete Internet Deals page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const internetDealsPageData = {
  /**
   * Internet deal products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'INTERNET-FIBER-GIGA',
      name: 'CitiSignal Fiber Gigabit',
      url_key: 'citisignal-fiber-gigabit',
      description: 'Lightning-fast fiber internet with speeds up to 1 Gig.',
      price: 79.99,
      currency: '$',
      rating_summary: 95,
      review_count: 2340,
      media_gallery: [
        {
          url: '/internet/fiber-gigabit.jpg',
          label: 'CitiSignal Fiber Gigabit',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'internet-deals',
      stock_status: 'in_stock',
      type: 'fiber',
      speed: '1 Gig',
      data_limit: 'Unlimited',
      installation: 'Professional installation included',
      equipment_included: ['Modem', 'Router', 'WiFi 6'],
      availability: 'Select areas',
      contract_length: '12 months',
      isNew: true,
      isSale: false
    },
    {
      id: '2',
      sku: 'INTERNET-5G-HOME',
      name: 'CitiSignal 5G Home Internet',
      url_key: 'citisignal-5g-home-internet',
      description: 'Wireless home internet powered by our 5G network.',
      price: 49.99,
      original_price: 69.99,
      currency: '$',
      rating_summary: 88,
      review_count: 1567,
      media_gallery: [
        {
          url: '/internet/5g-home.jpg',
          label: 'CitiSignal 5G Home Internet',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'internet-deals',
      stock_status: 'in_stock',
      type: '5g-home',
      speed: 'Up to 300 Mbps',
      data_limit: 'Unlimited',
      installation: 'Self-installation',
      equipment_included: ['5G Gateway'],
      availability: 'Most areas',
      contract_length: 'No contract',
      isNew: false,
      isSale: true
    }
  ] as InternetDeal[],

  /**
   * Filter configuration for internet deals page
   */
  filters: [
    {
      title: 'Type',
      key: 'type',
      type: 'checkbox' as const,
      options: [
        { id: 'fiber', name: 'Fiber' },
        { id: 'cable', name: 'Cable' },
        { id: '5g-home', name: '5G Home' },
        { id: 'satellite', name: 'Satellite' }
      ]
    },
    {
      title: 'Speed',
      key: 'speed',
      type: 'checkbox' as const,
      options: [
        { id: 'up-to-100', name: 'Up to 100 Mbps' },
        { id: '100-300', name: '100-300 Mbps' },
        { id: '300-500', name: '300-500 Mbps' },
        { id: 'over-500', name: 'Over 500 Mbps' }
      ]
    },
    {
      title: 'Price Range',
      key: 'price',
      type: 'checkbox' as const,
      options: [
        { id: 'under-30', name: 'Under $30' },
        { id: '30-50', name: '$30 - $50' },
        { id: '50-80', name: '$50 - $80' },
        { id: 'over-80', name: 'Over $80' }
      ]
    },
    {
      title: 'Contract Length',
      key: 'contract_length',
      type: 'checkbox' as const,
      options: [
        { id: 'no-contract', name: 'No Contract' },
        { id: '6-months', name: '6 Months' },
        { id: '12-months', name: '12 Months' },
        { id: '24-months', name: '24 Months' }
      ]
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
    description: 'Find the best internet deals for your home. Compare speeds, prices, and features from fiber to 5G home internet solutions.',
    icon: GlobeAltIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search internet deals...',
    itemLabel: 'internet deals'
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