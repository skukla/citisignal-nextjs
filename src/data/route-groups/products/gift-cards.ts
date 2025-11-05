import { GiftIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { BaseProduct } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

export interface GiftCard extends BaseProduct {
  type: 'physical' | 'digital' | 'service';
  amount: number;
  delivery_time: string;
  validity_period: string;
  restrictions?: string[];
}

/**
 * Complete Gift Cards page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const giftCardsPageData = {
  /**
   * Gift card products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'GIFT-DIGITAL-50',
      name: 'Digital Gift Card - $50',
      urlKey: 'digital-gift-card-50',
      description: 'Perfect for any occasion. Delivered instantly via email.',
      price: 50,
      currency: '$',
      rating_summary: 96,
      review_count: 1234,
      images: [
        {
          url: '/gift-cards/digital-50.jpg',
          label: 'Digital Gift Card $50',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'gift-cards',
      stock_status: 'in_stock',
      type: 'digital',
      amount: 50,
      delivery_time: 'Instant',
      validity_period: '1 year',
      isNew: false,
      isSale: false,
    },
    {
      id: '2',
      sku: 'GIFT-PHYSICAL-100',
      name: 'Physical Gift Card - $100',
      urlKey: 'physical-gift-card-100',
      description: 'Beautiful physical card perfect for gifting.',
      price: 100,
      currency: '$',
      rating_summary: 94,
      review_count: 567,
      images: [
        {
          url: '/gift-cards/physical-100.jpg',
          label: 'Physical Gift Card $100',
          roles: ['small_image', 'thumbnail'],
        },
      ],
      category: 'gift-cards',
      stock_status: 'in_stock',
      type: 'physical',
      amount: 100,
      delivery_time: '3-5 business days',
      validity_period: '2 years',
      isNew: true,
      isSale: false,
    },
  ] as unknown as GiftCard[],

  /**
   * Filter configuration for gift cards page
   */
  filters: [
    {
      title: 'Type',
      key: 'type',
      type: 'checkbox' as const,
      options: [
        { id: 'physical', name: 'Physical Card' },
        { id: 'digital', name: 'Digital Card' },
        { id: 'service', name: 'Service Credit' },
      ],
    },
    {
      title: 'Amount',
      key: 'amount',
      type: 'checkbox' as const,
      options: [
        { id: '25', name: '$25' },
        { id: '50', name: '$50' },
        { id: '100', name: '$100' },
        { id: '200', name: '$200' },
      ],
    },
    {
      title: 'Delivery Time',
      key: 'delivery_time',
      type: 'checkbox' as const,
      options: [
        { id: 'instant', name: 'Instant' },
        { id: 'same-day', name: 'Same Day' },
        { id: '1-3-days', name: '1-3 Days' },
        { id: '3-5-days', name: '3-5 Days' },
      ],
    },
    {
      title: 'Validity Period',
      key: 'validity_period',
      type: 'checkbox' as const,
      options: [
        { id: '6-months', name: '6 Months' },
        { id: '1-year', name: '1 Year' },
        { id: '2-years', name: '2 Years' },
        { id: 'no-expiry', name: 'No Expiry' },
      ],
    },
  ] as FilterSection[],

  /**
   * Breadcrumb navigation for gift cards page
   */
  breadcrumbs: [{ name: 'Gift Cards' }],

  /**
   * Page header configuration
   */
  pageHeader: {
    title: 'Gift Cards',
    description:
      'Give the gift of choice with our flexible gift cards. Perfect for any occasion, available in physical and digital formats with various denominations.',
    icon: GiftIcon,
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search gift cards...',
    itemLabel: 'gift cards',
  },

  /**
   * Empty state configuration
   */
  emptyState: {
    icon: Bars3Icon,
    title: 'No gift cards found',
    description: "Try adjusting your search or filter criteria to find what you're looking for.",
    actionLabel: 'Clear all filters',
  },
};
