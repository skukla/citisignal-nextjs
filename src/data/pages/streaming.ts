import { PlayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { streamingFilterOptions } from '@/data/streaming';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Streaming page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const streamingPageConfig = {
  /**
   * Filter configuration for streaming page
   */
  filters: [
    {
      title: 'Service Type',
      key: 'type',
      options: streamingFilterOptions.type,
      type: 'checkbox' as const
    },
    {
      title: 'Price Range',
      key: 'price',
      options: streamingFilterOptions.price,
      type: 'checkbox' as const
    },
    {
      title: 'Content Type',
      key: 'content',
      options: streamingFilterOptions.content,
      type: 'checkbox' as const
    },
    {
      title: 'Features',
      key: 'features',
      options: streamingFilterOptions.features,
      type: 'checkbox' as const
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for streaming page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Streaming' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Streaming Services',
    description: 'Discover the best streaming services for entertainment, sports, and more. Find the perfect combination of content and value with our curated selection of streaming options.',
    icon: PlayIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search streaming services...',
    itemLabel: 'services'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No streaming services found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};