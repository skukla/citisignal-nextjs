import { SignalIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Plan } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

/**
 * Complete Plans page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const plansPageData = {
  /**
   * Plan products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'PLAN-UNLIMITED-MAX',
      name: 'CitiSignal Unlimited Max',
      urlKey: 'citisignal-unlimited-max',
      description: 'Our premium unlimited plan with all the perks.',
      price: 85,
      currency: '$',
      rating_summary: 94,
      review_count: 1250,
      images: [
        {
          url: '/plans/unlimited-max.jpg',
          label: 'CitiSignal Unlimited Max Plan',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'plans',
      stock_status: 'in_stock',
      type: 'unlimited',
      data: 'Unlimited Premium',
      talk: 'Unlimited',
      text: 'Unlimited',
      hotspot: '40GB high-speed data',
      streaming: ['Up to 4k UHD streaming'],
      network_priority: 'premium',
      contract_required: false,
      isNew: false,
      isSale: false
    },
    {
      id: '2',
      sku: 'PLAN-FAMILY-SHARE',
      name: 'CitiSignal Family Share',
      urlKey: 'citisignal-family-share',
      description: 'Perfect for families with shared data and individual lines.',
      price: 120,
      original_price: 140,
      currency: '$',
      rating_summary: 88,
      review_count: 850,
      images: [
        {
          url: '/plans/family-share.jpg',
          label: 'CitiSignal Family Share Plan',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'plans',
      stock_status: 'in_stock',
      type: 'family',
      data: '100GB',
      talk: 'Unlimited',
      text: 'Unlimited',
      hotspot: '5GB high-speed data',
      streaming: ['SD Streaming'],
      network_priority: 'standard',
      contract_required: true,
      isNew: true,
      isSale: true
    },
    {
      id: '3',
      sku: 'PLAN-ESSENTIALS',
      name: 'CitiSignal Essentials',
      urlKey: 'citisignal-essentials',
      description: 'Basic plan with everything you need.',
      price: 45,
      currency: '$',
      rating_summary: 86,
      review_count: 620,
      images: [
        {
          url: '/plans/essentials.jpg',
          label: 'CitiSignal Essentials Plan',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'plans',
      stock_status: 'in_stock',
      type: 'individual',
      data: '50GB',
      talk: 'Unlimited',
      text: 'Unlimited',
      hotspot: 'Unlimited 3G speed',
      streaming: ['SD Streaming'],
      network_priority: 'basic',
      contract_required: false,
      isNew: false,
      isSale: false
    }
  ] as Plan[],

  /**
   * Filter configuration for plans page
   */
  filters: [
    {
      title: 'Plan Type',
      key: 'type',
      type: 'checkbox' as const,
      options: [
        { id: 'individual', name: 'Individual' },
        { id: 'family', name: 'Family' },
        { id: 'unlimited', name: 'Unlimited' },
        { id: 'prepaid', name: 'Prepaid' }
      ]
    },
    {
      title: 'Price Range',
      key: 'price',
      type: 'checkbox' as const,
      options: [
        { id: 'under-50', name: 'Under $50' },
        { id: '50-100', name: '$50 - $100' },
        { id: 'over-100', name: 'Over $100' }
      ]
    },
    {
      title: 'Data Amount',
      key: 'data',
      type: 'checkbox' as const,
      options: [
        { id: '50gb', name: '50GB' },
        { id: '100gb', name: '100GB' },
        { id: 'unlimited', name: 'Unlimited' }
      ]
    },
    {
      title: 'Features',
      key: 'features',
      type: 'checkbox' as const,
      options: [
        { id: 'hotspot', name: 'Mobile Hotspot' },
        { id: 'streaming', name: 'HD Streaming' },
        { id: 'international', name: 'International' }
      ]
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for plans page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Plans' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Wireless Plans',
    description: 'Choose the perfect wireless plan for your needs. From unlimited data to family plans, we have flexible options with no hidden fees and the reliability of our nationwide network.',
    icon: SignalIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search plans...',
    itemLabel: 'plans'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No plans found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};