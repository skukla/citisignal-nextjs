import { GiftIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { giftCardFilterOptions } from '@/data/gift-cards';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Centralized configuration for the Gift Cards page.
 * Contains all page-specific data: filters, breadcrumbs, header, empty state.
 */
export const giftCardsPageConfig = {
  /**
   * Filter configuration for gift cards page
   */
  filters: [
    {
      title: 'Amount',
      key: 'amount',
      options: giftCardFilterOptions.amount,
      type: 'checkbox' as const
    },
    {
      title: 'Category',
      key: 'category',
      options: giftCardFilterOptions.category,
      type: 'checkbox' as const
    },
    {
      title: 'Brand',
      key: 'brand',
      options: giftCardFilterOptions.brand,
      type: 'checkbox' as const
    },
    {
      title: 'Delivery Method',
      key: 'delivery',
      options: giftCardFilterOptions.delivery,
      type: 'checkbox' as const
    }
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for gift cards page
   */
  breadcrumbs: [
    { name: 'Shop', href: '/shop' },
    { name: 'Gift Cards' }
  ],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Gift Cards',
    description: 'Give the perfect gift with our selection of digital and physical gift cards. From popular retailers to entertainment services, find the ideal present for any occasion.',
    icon: GiftIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search gift cards...',
    itemLabel: 'gift cards'
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No gift cards found',
    description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
    actionLabel: 'Clear all filters'
  }
};