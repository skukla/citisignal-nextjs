import { 
  DevicePhoneMobileIcon, 
  BoltIcon,
  ShieldCheckIcon,
  CameraIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

import { Phone, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';
import type { TechReview, BuyingGuide, Tip, Accessory } from '@/types/content';

/**
 * Complete Phones page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const phonesPageData = {
  /**
   * Phone products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'PHONE-IPHONE-15-PRO',
      name: 'iPhone 15 Pro',
      url_key: 'iphone-15-pro',
      description: 'The most advanced iPhone ever.',
      price: 999,
      currency: 'USD',
      rating_summary: 95,
      review_count: 1250,
      media_gallery: [
        {
          url: '/phones/iphone-15-pro.jpg',
          label: 'iPhone 15 Pro',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'phones',
      stock_status: 'IN_STOCK',
      manufacturer: 'Apple',
      memory: ['128GB'],
      available_colors: [
        { name: 'Natural Titanium', hex: '#F5F5DC' },
        { name: 'Blue Titanium', hex: '#4169E1' },
        { name: 'White Titanium', hex: '#F8F8FF' },
        { name: 'Black Titanium', hex: '#2F2F2F' }
      ],
      extended_capacity_5g: true,
      extended_range_5g: true,
      isNew: true,
      isSale: false
    },
    {
      id: '2',
      sku: 'PHONE-SAMSUNG-S24',
      name: 'Samsung Galaxy S24',
      url_key: 'samsung-galaxy-s24',
      description: 'Galaxy AI is here. Search like never before, get real-time interpretation on a call, format your notes into a clear summary, and edit your photos effortlessly.',
      price: 799,
      currency: 'USD',
      rating_summary: 91,
      review_count: 890,
      media_gallery: [
        {
          url: '/phones/samsung-s24.jpg',
          label: 'Samsung Galaxy S24',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'phones',
      stock_status: 'IN_STOCK',
      manufacturer: 'Samsung',
      memory: ['256GB'],
      available_colors: [
        { name: 'Onyx Black', hex: '#000000' },
        { name: 'Marble Gray', hex: '#808080' },
        { name: 'Cobalt Violet', hex: '#915C83' },
        { name: 'Amber Yellow', hex: '#FFBF00' }
      ],
      extended_capacity_5g: true,
      extended_range_5g: false,
      isNew: false,
      isSale: true
    }
  ] as Phone[],

  /**
   * Filter configuration for phones page
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
      title: 'Memory',
      key: 'memory',
      type: 'checkbox' as const,
      options: [
        { id: '128gb', name: '128GB' },
        { id: '256gb', name: '256GB' },
        { id: '512gb', name: '512GB' },
        { id: '1tb', name: '1TB' }
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
        { id: 'under-500', name: 'Under $500' },
        { id: '500-800', name: '$500 - $800' },
        { id: '800-1200', name: '$800 - $1,200' },
        { id: 'over-1200', name: 'Over $1,200' }
      ]
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for phones page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Phones' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Smartphones',
    description: 'Discover the latest smartphones with cutting-edge technology, exceptional cameras, and lightning-fast performance. Find your perfect device from top brands.',
    icon: DevicePhoneMobileIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search phones...',
    itemLabel: 'phones'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No phones found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  },

  /**
   * Enhanced content sections specific to phones page
   */
  techReviews: [
    {
      id: '1',
      title: 'iPhone 15 Pro Review: A Titanium Powerhouse',
      description: 'Apple\'s latest flagship brings titanium construction, improved cameras, and the new Action Button.',
      slug: 'iphone-15-pro-review'
    },
    {
      id: '2',
      title: 'Samsung Galaxy S24 vs iPhone 15: The Ultimate Comparison',
      description: 'We pit Samsung\'s latest against Apple\'s flagship to see which offers better value.',
      slug: 'samsung-s24-vs-iphone-15'
    }
  ] as TechReview[],

  buyingGuides: [
    {
      id: '1',
      icon: ShieldCheckIcon,
      title: 'How to Choose the Right Smartphone in 2024',
      description: 'Everything you need to know about selecting the perfect phone for your needs and budget.'
    },
    {
      id: '2',
      icon: CameraIcon,
      title: 'Camera Phone Showdown: Which Takes the Best Photos?',
      description: 'Compare camera quality across flagship phones to find the best for photography.'
    }
  ] as BuyingGuide[],

  tips: [
    {
      id: '1',
      title: 'Extend Your Battery Life',
      description: 'Simple settings changes that can double your phone\'s battery life.',
      category: 'Battery Tips'
    },
    {
      id: '2',
      title: 'Take Professional Photos',
      description: 'Master your phone\'s camera with these pro photography techniques.',
      category: 'Photography'
    },
    {
      id: '3',
      title: 'Secure Your Device',
      description: 'Essential security features every smartphone user should enable.',
      category: 'Security'
    }
  ] as Tip[],

  accessories: [
    {
      id: '1',
      icon: BoltIcon,
      name: 'Wireless Charging Stand',
      price: '$49.99'
    },
    {
      id: '2',
      icon: ShieldCheckIcon,
      name: 'Premium Phone Case',
      price: '$34.99'
    }
  ] as Accessory[]
};