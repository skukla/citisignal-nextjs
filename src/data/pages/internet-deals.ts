import { GlobeAltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { internetDealFilterOptions } from '@/data/internet-deals';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Internet Deals page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const internetDealsPageConfig = {
  /**
   * Filter configuration for internet deals page
   */
  filters: [
    {
      title: 'Speed',
      key: 'speed',
      options: internetDealFilterOptions.speed,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: internetDealFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Provider',
      key: 'provider',
      options: internetDealFilterOptions.provider,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: internetDealFilterOptions.features,
      type: 'checkbox' as const
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
    description: 'Find the best internet deals and packages for your home or business. Compare speeds, prices, and features to get the perfect connectivity solution at an unbeatable price.',
    icon: GlobeAltIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search internet deals...',
    itemLabel: 'deals'
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