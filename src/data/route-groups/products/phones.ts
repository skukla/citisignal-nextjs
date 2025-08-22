import {
  DevicePhoneMobileIcon,
  BoltIcon,
  ShieldCheckIcon,
  CameraIcon,
  Bars3Icon,
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
      urlKey: 'iphone-15-pro',
      description: 'The most advanced iPhone ever.',
      price: 999,
      currency: '$',
      rating_summary: 95,
      review_count: 1250,
      images: [
        {
          url: '/phones/iphone-15-pro.jpg',
          label: 'iPhone 15 Pro',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'phones',
      stock_status: 'in_stock',
      manufacturer: 'Apple',
      memory: ['128GB'],
      available_colors: [
        { name: 'Natural Titanium', hex: '#9FA1A3' },
        { name: 'Blue Titanium', hex: '#515B6F' },
        { name: 'White Titanium', hex: '#F5F5F0' },
        { name: 'Black Titanium', hex: '#3D3C41' },
      ],
      extended_capacity_5g: true,
      extended_range_5g: true,
      isNew: true,
      isSale: false,
    },
    {
      id: '2',
      sku: 'PHONE-SAMSUNG-S24',
      name: 'Samsung Galaxy S24',
      urlKey: 'samsung-galaxy-s24',
      description:
        'Galaxy AI is here. Search like never before, get real-time interpretation on a call, format your notes into a clear summary, and edit your photos effortlessly.',
      price: 799,
      currency: '$',
      rating_summary: 91,
      review_count: 890,
      images: [
        {
          url: '/phones/samsung-s24.jpg',
          label: 'Samsung Galaxy S24',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'phones',
      stock_status: 'in_stock',
      manufacturer: 'Samsung',
      memory: ['256GB'],
      available_colors: [
        { name: 'Titanium Black', hex: '#2A2A2C' },
        { name: 'Titanium Gray', hex: '#7C7C7E' },
        { name: 'Titanium Violet', hex: '#7B6C7E' },
        { name: 'Titanium Yellow', hex: '#F3E0B6' },
      ],
      extended_capacity_5g: true,
      extended_range_5g: false,
      isNew: false,
      isSale: true,
    },
    {
      id: '3',
      sku: 'PHONE-IPHONE-15',
      name: 'iPhone 15',
      urlKey: 'iphone-15',
      description: 'The powerful iPhone for everyone.',
      price: 799,
      original_price: 899,
      currency: '$',
      rating_summary: 90,
      review_count: 950,
      images: [
        {
          url: '/phones/iphone-15.jpg',
          label: 'iPhone 15',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'phones',
      stock_status: 'in_stock',
      manufacturer: 'Apple',
      memory: ['128GB', '256GB', '512GB'],
      available_colors: [
        { name: 'Pink', hex: '#F8D7D9' },
        { name: 'Yellow', hex: '#F3E3B6' },
        { name: 'Green', hex: '#A7C1B5' },
        { name: 'Blue', hex: '#B4C4DE' },
        { name: 'Black', hex: '#3F3F3D' },
      ],
      extended_capacity_5g: true,
      extended_range_5g: false,
      isNew: true,
      isSale: true,
    },
    {
      id: '4',
      sku: 'PHONE-CITISIGNAL-ULTRA',
      name: 'CitiSignal Ultra 5G',
      urlKey: 'citisignal-ultra-5g',
      description: 'Our most advanced 5G phone yet.',
      price: 899,
      currency: '$',
      rating_summary: 88,
      review_count: 450,
      images: [
        {
          url: '/phones/citisignal-ultra.jpg',
          label: 'CitiSignal Ultra 5G',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'phones',
      stock_status: 'in_stock',
      manufacturer: 'CitiSignal',
      memory: ['128GB', '256GB'],
      available_colors: [
        { name: 'Midnight Blue', hex: '#1F2330' },
        { name: 'Silver', hex: '#F1F3EE' },
        { name: 'Graphite', hex: '#5F5E5A' },
      ],
      extended_capacity_5g: true,
      extended_range_5g: true,
      isNew: true,
      isSale: false,
    },
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
        { id: 'Apple', name: 'Apple' },
        { id: 'Samsung', name: 'Samsung' },
        { id: 'CitiSignal', name: 'CitiSignal' },
      ],
    },
    {
      title: 'Memory',
      key: 'memory',
      type: 'checkbox' as const,
      options: [
        { id: '128gb', name: '128GB' },
        { id: '256gb', name: '256GB' },
        { id: '512gb', name: '512GB' },
        { id: '1tb', name: '1TB' },
      ],
    },
    {
      title: 'Colors',
      key: 'colors',
      type: 'checkbox' as const,
      options: colorOptions,
    },
    {
      title: 'Price Range',
      key: 'price',
      type: 'checkbox' as const,
      options: [
        { id: 'under-500', name: 'Under $500' },
        { id: '500-800', name: '$500 - $800' },
        { id: '800-1200', name: '$800 - $1,200' },
        { id: 'over-1200', name: 'Over $1,200' },
      ],
    },
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for phones page
   */
  breadcrumbs: [{ name: 'Phones' }],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Phones',
    description:
      'Discover the latest smartphones with cutting-edge technology, exceptional cameras, and lightning-fast performance. Find your perfect device from top brands.',
    icon: DevicePhoneMobileIcon,
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search phones...',
    itemLabel: 'phones',
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No phones found',
    description: "Try adjusting your search or filter criteria to find what you're looking for.",
    actionLabel: 'Clear all filters',
  },

  /**
   * Enhanced content sections specific to phones page
   */
  techReviews: [
    {
      id: '1',
      title: 'iPhone 15 Pro Review: A Titanium Powerhouse',
      description:
        "Apple's latest flagship brings titanium construction, improved cameras, and the new Action Button.",
      slug: 'iphone-15-pro-review',
    },
    {
      id: '2',
      title: 'Samsung Galaxy S24 vs iPhone 15: The Ultimate Comparison',
      description:
        "We pit Samsung's latest against Apple's flagship to see which offers better value.",
      slug: 'samsung-s24-vs-iphone-15',
    },
    {
      id: '3',
      title: '5G Speed Test: Real World Results',
      description:
        'We tested 5G speeds across different phones and locations. See which devices offer the fastest connectivity.',
      slug: '5g-speed-test-results',
    },
  ] as TechReview[],

  buyingGuides: [
    {
      id: '1',
      icon: ShieldCheckIcon,
      title: 'How to Choose the Right Smartphone in 2024',
      description:
        'Everything you need to know about selecting the perfect phone for your needs and budget.',
    },
    {
      id: '2',
      icon: CameraIcon,
      title: 'Camera Phone Showdown: Which Takes the Best Photos?',
      description:
        'Compare camera quality across flagship phones to find the best for photography.',
    },
  ] as BuyingGuide[],

  tips: [
    {
      id: '1',
      title: 'Extend Your Battery Life',
      description: "Simple settings changes that can double your phone's battery life.",
      category: 'Battery Tips',
    },
    {
      id: '2',
      title: 'Take Professional Photos',
      description: "Master your phone's camera with these pro photography techniques.",
      category: 'Photography',
    },
    {
      id: '3',
      title: 'Secure Your Device',
      description: 'Essential security features every smartphone user should enable.',
      category: 'Security',
    },
  ] as Tip[],

  accessories: [
    {
      id: '1',
      icon: BoltIcon,
      name: 'Wireless Charging Stand',
      price: '$49.99',
    },
    {
      id: '2',
      icon: ShieldCheckIcon,
      name: 'Premium Phone Case',
      price: '$34.99',
    },
  ] as Accessory[],
};
