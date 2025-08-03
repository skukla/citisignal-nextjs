import { PlayIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { FilterSection } from '@/components/ui/FilterSidebar/FilterSidebar.types';

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
 * Filter options for streaming services
 */
export const streamingFilterOptions = {
  provider: [
    { id: 'netflix', name: 'Netflix' },
    { id: 'disney', name: 'Disney+' },
    { id: 'hbo', name: 'HBO Max' },
    { id: 'citisignal', name: 'CitiSignal+' }
  ],
  price: [
    { id: 'under-10', name: 'Under $10' },
    { id: '10-15', name: '$10 - $15' },
    { id: 'over-15', name: 'Over $15' }
  ],
  content_type: [
    { id: 'movies', name: 'Movies' },
    { id: 'tv-shows', name: 'TV Shows' },
    { id: 'sports', name: 'Sports' },
    { id: 'kids', name: 'Kids' }
  ],
  video_quality: [
    { id: 'sd', name: 'SD' },
    { id: 'hd', name: 'HD' },
    { id: '4k', name: '4K UHD' }
  ],
  features: [
    { id: 'no-ads', name: 'No Ads' },
    { id: 'downloads', name: 'Downloads' },
    { id: 'live-tv', name: 'Live TV' },
    { id: 'family-friendly', name: 'Family Friendly' }
  ]
};

/**
 * Mock streaming services data
 */
export const streamingServices: StreamingService[] = [
  {
    id: '1',
    sku: 'STREAM-NETFLIX-STANDARD',
    name: 'Netflix Standard',
    url_key: 'netflix-standard',
    description: 'Stream unlimited movies and TV shows on two devices simultaneously in HD quality.',
    price: 15.49,
    currency: 'USD',
    rating_summary: 88,
    review_count: 1250,
    media_gallery: [
      {
        url: '/streaming/netflix.jpg',
        label: 'Netflix Standard Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'Netflix',
    video_quality: ['HD', '4K'],
    device_limit: '2 devices',
    download_allowed: true,
    ads_included: false,
    trial_period: '30 days',
    content: ['Movies', 'TV Shows', 'Documentaries'],
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'STREAM-DISNEY-PLUS',
    name: 'Disney+ Premium',
    url_key: 'disney-plus-premium',
    description: 'Access to Disney, Pixar, Marvel, Star Wars, and National Geographic content.',
    price: 10.99,
    currency: 'USD',
    rating_summary: 91,
    review_count: 890,
    media_gallery: [
      {
        url: '/streaming/disney-plus.jpg',
        label: 'Disney+ Premium',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'Disney',
    video_quality: ['HD', '4K'],
    device_limit: '4 devices',
    download_allowed: true,
    ads_included: false,
    trial_period: '7 days',
    content: ['Movies', 'TV Shows', 'Kids'],
    isNew: false,
    isSale: false
  },
  {
    id: '3',
    sku: 'STREAM-CITISIGNAL-PLUS',
    name: 'CitiSignal+ Entertainment',
    url_key: 'citisignal-plus-entertainment',
    description: 'Exclusive CitiSignal content plus popular movies and shows.',
    price: 12.99,
    original_price: 15.99,
    currency: 'USD',
    rating_summary: 85,
    review_count: 245,
    media_gallery: [
      {
        url: '/streaming/citisignal-plus.jpg',
        label: 'CitiSignal+ Entertainment',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'CitiSignal',
    video_quality: ['HD', '4K'],
    device_limit: 'Unlimited',
    download_allowed: true,
    ads_included: false,
    trial_period: '14 days',
    content: ['Movies', 'TV Shows', 'Sports'],
    isNew: true,
    isSale: true
  }
];

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
      title: 'Provider',
      key: 'provider',
      options: streamingFilterOptions.provider,
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
      key: 'content_type',
      options: streamingFilterOptions.content_type,
      type: 'checkbox' as const
    },
    {
      title: 'Video Quality',
      key: 'video_quality',
      options: streamingFilterOptions.video_quality,
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