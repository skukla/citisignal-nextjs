import { SignalIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { planFilterOptions } from '@/data/plans';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Plans page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const plansPageConfig = {
  /**
   * Filter configuration for plans page
   */
  filters: [
    {
      title: 'Plan Type',
      key: 'type',
      options: planFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: planFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Data Amount',
      key: 'data',
      options: planFilterOptions.data,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: planFilterOptions.features,
      type: 'checkbox' as const
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