import { BoltIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { accessoryFilterOptions } from '@/data/accessories';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Accessories page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const accessoriesPageConfig = {
  /**
   * Filter configuration for accessories page
   */
  filters: [
    {
      title: 'Manufacturer',
      key: 'manufacturer',
      options: accessoryFilterOptions.manufacturer,
      type: 'checkbox' as const
    },
    {
      title: 'Compatibility',
      key: 'compatibility',
      options: accessoryFilterOptions.compatibility,
      type: 'checkbox' as const
    },
    {
      title: 'Colors',
      key: 'colors',
      options: accessoryFilterOptions.colors,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: accessoryFilterOptions.price,
      type: 'checkbox' as const
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for accessories page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Accessories' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Phone Accessories',
    description: 'Enhance your phone experience with our collection of premium accessories. From protective cases to wireless chargers, find everything you need to get the most out of your device.',
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