import { 
  DevicePhoneMobileIcon, 
  CreditCardIcon,
  BoltIcon,
  ShieldCheckIcon,
  Battery100Icon,
  CameraIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

import { Phone, colorOptions } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';
import type { TechReview } from '@/components/ui/TechReviewGrid';
import type { BuyingGuide } from '@/components/ui/BuyingGuideGrid';
import type { Tip } from '@/components/ui/TipGrid';
import type { Accessory } from '@/components/ui/AccessoryGrid';

/**
 * Phone filter options
 */
export const phoneFilterOptions = {
  manufacturer: [
    { id: 'apple', name: 'Apple' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'citisignal', name: 'CitiSignal' }
  ],
  memory: [
    { id: '128gb', name: '128GB' },
    { id: '256gb', name: '256GB' },
    { id: '512gb', name: '512GB' },
    { id: '1tb', name: '1TB' }
  ],
  colors: colorOptions,
  price: [
    { id: 'under-700', name: 'Under $700' },
    { id: '700-1000', name: '$700 - $1000' },
    { id: 'over-1000', name: 'Over $1000' }
  ],
  features: [
    { id: 'extended-capacity-5g', name: 'Extended Capacity 5G' },
    { id: 'extended-range-5g', name: 'Extended Range 5G' }
  ]
};

/**
 * Mock phones data
 */
export const phones: Phone[] = [
  {
    id: '1',
    sku: 'PHONE-IPHONE-15-PRO-128',
    name: 'iPhone 15 Pro',
    url_key: 'iphone-15-pro-128gb',
    description: 'The ultimate iPhone with titanium design, A17 Pro chip, and pro camera system.',
    price: 999,
    original_price: 1099,
    currency: 'USD',
    rating_summary: 92,
    review_count: 245,
    media_gallery: [
      {
        url: '/phones/iphone-15-pro.jpg',
        label: 'iPhone 15 Pro Natural Titanium',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    memory: ['128GB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Natural Titanium', hex: '#A7A299' },
      { name: 'Blue Titanium', hex: '#5E7C8B' },
      { name: 'White Titanium', hex: '#F7F3E8' },
      { name: 'Black Titanium', hex: '#1D1D1D' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    sku: 'PHONE-SAMSUNG-S24-ULTRA-256',
    name: 'Galaxy S24 Ultra',
    url_key: 'galaxy-s24-ultra-256gb',
    description: 'The most powerful Galaxy with S Pen, 200MP camera, and Galaxy AI features.',
    price: 1199,
    original_price: 1299,
    currency: 'USD',
    rating_summary: 89,
    review_count: 186,
    media_gallery: [
      {
        url: '/phones/galaxy-s24-ultra.jpg',
        label: 'Galaxy S24 Ultra Titanium Gray',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'Samsung',
    memory: ['256GB'],
    extended_capacity_5g: true,
    extended_range_5g: false,
    available_colors: [
      { name: 'Titanium Gray', hex: '#8B8B8B' },
      { name: 'Titanium Black', hex: '#1A1A1A' },
      { name: 'Titanium Violet', hex: '#8B7AB8' },
      { name: 'Titanium Yellow', hex: '#F4E04D' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '3',
    sku: 'PHONE-CS-GALAXY-512',
    name: 'CitiSignal Galaxy Pro',
    url_key: 'citisignal-galaxy-pro-512gb',
    description: 'Premium CitiSignal phone with extended 5G coverage and exclusive network features.',
    price: 899,
    currency: 'USD',
    rating_summary: 88,
    review_count: 94,
    media_gallery: [
      {
        url: '/phones/citisignal-galaxy.jpg',
        label: 'CitiSignal Galaxy Pro Midnight Blue',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'CitiSignal',
    memory: ['512GB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Midnight Blue', hex: '#1A237E' },
      { name: 'Cosmic Silver', hex: '#E8EAF6' },
      { name: 'Aurora Green', hex: '#4CAF50' }
    ],
    isNew: true,
    isSale: false
  }
];

/**
 * Tech Reviews data for the phones page
 */
export const techReviews: TechReview[] = [
  {
    id: 'iphone-15-vs-galaxy-s24',
    title: 'iPhone 15 Pro vs Galaxy S24 Ultra: The Ultimate Camera Showdown',
    description: 'We put these flagship phones head-to-head in real-world photography tests. See which one comes out on top in our detailed comparison.',
    duration: '12:45',
    href: '/reviews/iphone-15-vs-galaxy-s24'
  },
  {
    id: 'best-budget-phones-2024',
    title: 'The Best Budget Phones of 2024',
    description: 'Amazing phones don\'t have to break the bank. Discover our top picks for phones under $500 that deliver incredible value.',
    duration: '8:32',
    href: '/reviews/best-budget-phones-2024'
  },
  {
    id: '5g-speed-test',
    title: '5G Speed Test: Real World Results',
    description: 'We tested 5G speeds across different phones and locations. See which devices offer the fastest connectivity in your area.',
    duration: '15:20',
    href: '/reviews/5g-speed-test'
  }
];

/**
 * Buying Guides data for the phones page
 */
export const buyingGuides: BuyingGuide[] = [
  {
    id: 'choosing-perfect-phone',
    icon: DevicePhoneMobileIcon,
    title: 'How to Choose Your Perfect Phone',
    description: 'From screen size to battery life, learn what features matter most for your needs.',
    linkText: 'Read More →',
    href: '/guides/choosing-perfect-phone'
  },
  {
    id: 'phone-financing',
    icon: CreditCardIcon,
    title: 'Understanding Phone Financing',
    description: 'Compare payment plans, trade-in options, and find the best way to finance your new phone.',
    linkText: 'Read More →',
    href: '/guides/phone-financing'
  }
];

/**
 * Tips & Tricks data for the phones page
 */
export const phoneTips: Tip[] = [
  {
    id: 'camera-mastery',
    category: 'Photography',
    title: 'Master Your Phone\'s Camera',
    description: 'Pro tips for taking stunning photos with any smartphone camera.',
    href: '/tips/camera-mastery'
  },
  {
    id: 'battery-life',
    category: 'Battery Life',
    title: 'Extend Your Battery Life',
    description: 'Simple tricks to make your phone\'s battery last all day and beyond.',
    href: '/tips/battery-life'
  },
  {
    id: 'phone-security',
    category: 'Security',
    title: 'Keep Your Phone Secure',
    description: 'Essential security settings and practices for protecting your device.',
    href: '/tips/phone-security'
  }
];

/**
 * Essential Accessories data for the phones page
 */
export const essentialAccessories: Accessory[] = [
  {
    id: 'fast-chargers',
    icon: BoltIcon,
    name: 'Fast Chargers',
    price: 'From $29',
    href: '/accessories/chargers'
  },
  {
    id: 'phone-cases',
    icon: ShieldCheckIcon,
    name: 'Phone Cases',
    price: 'From $19',
    href: '/accessories/cases'
  },
  {
    id: 'power-banks',
    icon: Battery100Icon,
    name: 'Power Banks',
    price: 'From $39',
    href: '/accessories/power-banks'
  },
  {
    id: 'camera-lenses',
    icon: CameraIcon,
    name: 'Camera Lenses',
    price: 'From $49',
    href: '/accessories/camera-lenses'
  }
];

/**
 * Page metadata for the phones page
 */
export const phonesPageContent = {
  header: {
    title: 'Phones',
    description: 'Find your perfect phone from our wide selection of the latest smartphones. From flagship models to budget-friendly options, we have the right device for you.',
    icon: DevicePhoneMobileIcon
  },
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Phones' }
  ] as { name: string; href?: string }[],
  sections: {
    techReviews: {
      title: 'Latest Tech Reviews',
      reviews: techReviews
    },
    buyingGuides: {
      title: 'Phone Buying Guides',
      guides: buyingGuides
    },
    tips: {
      title: 'Tips & Tricks',
      subtitle: 'View All Tips →',
      tips: phoneTips
    },
    accessories: {
      title: 'Essential Accessories',
      accessories: essentialAccessories
    }
  }
} as const;

/**
 * Centralized configuration for the Phones page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const phonesPageConfig = {
  /**
   * Filter configuration for phones page
   */
  filters: [
    {
      title: 'Manufacturer',
      key: 'manufacturer',
      options: phoneFilterOptions.manufacturer,
      type: 'checkbox' as const
    },
    {
      title: 'Memory',
      key: 'memory',
      options: phoneFilterOptions.memory,
      type: 'checkbox' as const
    },
    {
      title: 'Colors',
      key: 'colors',
      options: phoneFilterOptions.colors,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: phoneFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: phoneFilterOptions.features,
      type: 'checkbox' as const
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
    description: 'Discover the latest smartphones from top brands. From flagship models with cutting-edge features to budget-friendly options, find the perfect phone that fits your lifestyle and budget.',
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
  }
};