import { PlayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';
import { BaseProduct } from '@/types/commerce';

export interface StreamingService extends BaseProduct {
  provider: string;
  video_quality: string[];
  device_limit: string;
  download_allowed: boolean;
  ads_included: boolean;
  trial_period: string;
  content: string[];
}

/**
 * Complete Streaming page data - everything a content editor needs in one place.
 * Contains products, filters, and all page configuration.
 */
export const streamingPageData = {
  /**
   * Streaming service products - what gets displayed and filtered
   */
  products: [
    {
      id: '1',
      sku: 'STREAM-NETFLIX-PREMIUM',
      name: 'Netflix Premium',
      url_key: 'netflix-premium',
      description: 'Watch unlimited movies and TV shows in Ultra HD.',
      price: 15.49,
      currency: '$',
      rating_summary: 92,
      review_count: 15420,
      media_gallery: [
        {
          url: '/streaming/netflix-premium.jpg',
          label: 'Netflix Premium Plan',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'streaming',
      stock_status: 'IN_STOCK',
      provider: 'Netflix',
      video_quality: ['4K Ultra HD', 'HD', 'SD'],
      device_limit: '4 screens at once',
      download_allowed: true,
      ads_included: false,
      trial_period: '30 days',
      content: ['Movies', 'TV Shows', 'Documentaries', 'Originals'],
      isNew: false,
      isSale: false
    },
    {
      id: '2',
      sku: 'STREAM-DISNEY-BUNDLE',
      name: 'Disney+ Bundle',
      url_key: 'disney-plus-bundle',
      description: 'Disney+, Hulu, and ESPN+ all in one package.',
      price: 19.99,
      currency: '$',
      rating_summary: 89,
      review_count: 8934,
      media_gallery: [
        {
          url: '/streaming/disney-bundle.jpg',
          label: 'Disney+ Bundle',
          roles: ['small_image', 'thumbnail']
        }
      ],
      category: 'streaming',
      stock_status: 'IN_STOCK',
      provider: 'Disney',
      video_quality: ['4K Ultra HD', 'HD'],
      device_limit: '4 screens at once',
      download_allowed: true,
      ads_included: true,
      trial_period: '7 days',
      content: ['Movies', 'TV Shows', 'Sports', 'Kids'],
      isNew: true,
      isSale: true
    }
  ] as StreamingService[],

  /**
   * Filter configuration for streaming page
   */
  filters: [
    {
      title: 'Provider',
      key: 'provider',
      type: 'checkbox' as const,
      options: [
        { id: 'netflix', name: 'Netflix' },
        { id: 'disney', name: 'Disney+' },
        { id: 'hbo', name: 'HBO Max' },
        { id: 'citisignal', name: 'CitiSignal+' }
      ]
    },
    {
      title: 'Price Range',
      key: 'price',
      type: 'checkbox' as const,
      options: [
        { id: 'under-10', name: 'Under $10' },
        { id: '10-15', name: '$10 - $15' },
        { id: '15-20', name: '$15 - $20' },
        { id: 'over-20', name: 'Over $20' }
      ]
    },
    {
      title: 'Content Type',
      key: 'content_type',
      type: 'checkbox' as const,
      options: [
        { id: 'movies', name: 'Movies' },
        { id: 'tv-shows', name: 'TV Shows' },
        { id: 'sports', name: 'Sports' },
        { id: 'kids', name: 'Kids' }
      ]
    },
    {
      title: 'Video Quality',
      key: 'video_quality',
      type: 'checkbox' as const,
      options: [
        { id: '4k', name: '4K Ultra HD' },
        { id: 'hd', name: 'HD' },
        { id: 'sd', name: 'SD' }
      ]
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
    description: 'Discover the best streaming services for movies, TV shows, sports, and more. Compare plans and find the perfect entertainment package for your needs.',
    icon: PlayIcon
  },

  /**
   * Search configuration
   */
  search: {
    placeholder: 'Search streaming services...',
    itemLabel: 'streaming services'
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