import { WatchIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { watchFilterOptions } from '@/data/watches';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Watches page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const watchesPageConfig = {
  /**
   * Filter configuration for watches page
   */
  filters: [
    {
      title: 'Brand',
      key: 'brand',
      options: watchFilterOptions.brand,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: watchFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: watchFilterOptions.features,
      type: 'checkbox' as const
    },
    {
      title: 'Style',
      key: 'style',
      options: watchFilterOptions.style,
      type: 'checkbox' as const
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for watches page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Watches' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Smartwatches',
    description: 'Stay connected and track your fitness with our selection of smartwatches. From health monitoring to seamless connectivity, find the perfect wearable technology for your lifestyle.',
    icon: WatchIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search watches...',
    itemLabel: 'watches'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No watches found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};