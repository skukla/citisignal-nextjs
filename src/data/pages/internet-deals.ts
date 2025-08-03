import { GlobeAltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { internetDealsFilterOptions } from '@/data/internetDeals';
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
      title: 'Type',
      key: 'type',
      options: internetDealsFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Speed',
      key: 'speed',
      options: internetDealsFilterOptions.speed,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: internetDealsFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Contract Length',
      key: 'contract_length',
      options: internetDealsFilterOptions.contract_length,
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