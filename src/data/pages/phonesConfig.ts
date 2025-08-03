import { DevicePhoneMobileIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { phoneFilterOptions } from '@/data/phones';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

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
      title: 'Brand',
      key: 'brand',
      options: phoneFilterOptions.brand,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: phoneFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Storage',
      key: 'storage',
      options: phoneFilterOptions.storage,
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