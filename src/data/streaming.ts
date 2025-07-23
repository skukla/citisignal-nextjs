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

// Mock data matching Commerce API structure
export const streamingServices: StreamingService[] = [
  {
    id: '1',
    sku: 'STREAM-CS-PLUS-PREMIUM',
    name: 'CitiSignal+ Premium',
    url_key: 'citisignal-plus-premium',
    description: 'Premium streaming with exclusive content and live sports.',
    price: 14.99,
    original_price: 19.99,
    currency: 'USD',
    rating_summary: 92,
    review_count: 456,
    media_gallery: [
      {
        url: '/streaming/cs-plus.jpg',
        label: 'CitiSignal+ Premium',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'CitiSignal',
    video_quality: ['4K UHD', 'HDR'],
    device_limit: '4 devices',
    download_allowed: true,
    ads_included: false,
    trial_period: '30 days',
    content: ['Movies', 'TV Shows', 'Sports', 'Kids'],
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    sku: 'STREAM-CS-PLUS-BASIC',
    name: 'CitiSignal+ Basic',
    url_key: 'citisignal-plus-basic',
    description: 'Essential streaming package with great content.',
    price: 9.99,
    currency: 'USD',
    rating_summary: 86,
    review_count: 234,
    media_gallery: [
      {
        url: '/streaming/cs-plus-basic.jpg',
        label: 'CitiSignal+ Basic',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'CitiSignal',
    video_quality: ['HD'],
    device_limit: '2 devices',
    download_allowed: true,
    ads_included: true,
    trial_period: '14 days',
    content: ['Movies', 'TV Shows', 'Kids'],
    isNew: false,
    isSale: false
  },
  {
    id: '3',
    sku: 'STREAM-CS-PLUS-FAMILY',
    name: 'CitiSignal+ Family',
    url_key: 'citisignal-plus-family',
    description: 'Family-friendly streaming with parental controls.',
    price: 16.99,
    original_price: 19.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 567,
    media_gallery: [
      {
        url: '/streaming/cs-plus-family.jpg',
        label: 'CitiSignal+ Family',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'streaming',
    stock_status: 'IN_STOCK',
    provider: 'CitiSignal',
    video_quality: ['4K UHD', 'HDR'],
    device_limit: '6 devices',
    download_allowed: true,
    ads_included: false,
    trial_period: '30 days',
    content: ['Movies', 'TV Shows', 'Kids', 'Educational'],
    isNew: false,
    isSale: true
  }
]; 