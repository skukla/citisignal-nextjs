import { 
  DevicePhoneMobileIcon, 
  CreditCardIcon,
  BoltIcon,
  ShieldCheckIcon,
  Battery100Icon,
  CameraIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { phoneFilterOptions } from '@/data/phones';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';
import type { TechReview } from '@/components/ui/TechReviewGrid';
import type { BuyingGuide } from '@/components/ui/BuyingGuideGrid';
import type { Tip } from '@/components/ui/TipGrid';
import type { Accessory } from '@/components/ui/AccessoryGrid';

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