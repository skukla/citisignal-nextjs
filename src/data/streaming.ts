export interface StreamingService {
  id: string;
  name: string;
  provider: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  features: string[];
  content: string[];
  rating: number;
  reviews: number;
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  trialPeriod: string;
  videoQuality: string[];
  deviceLimit: string;
  downloadAllowed: boolean;
  adsIncluded: boolean;
}

export const streamingServices: StreamingService[] = [
  {
    id: 'netflix-premium',
    name: 'Netflix Premium',
    provider: 'Netflix',
    price: 15.99,
    originalPrice: 19.99,
    category: 'streaming',
    description: 'Premium Netflix subscription with 4K streaming and 4 simultaneous screens.',
    features: ['4K Ultra HD', '4 Screens at Once', 'Download to 6 Devices', 'No Ads'],
    content: ['Movies', 'TV Shows', 'Documentaries', 'Netflix Originals'],
    rating: 4.7,
    reviews: 25400,
    isPopular: true,
    isNew: false,
    isSale: true,
    trialPeriod: '30 days',
    videoQuality: ['HD', '4K Ultra HD'],
    deviceLimit: '4 screens',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'disney-plus-bundle',
    name: 'Disney+ Bundle',
    provider: 'Disney',
    price: 19.99,
    originalPrice: 24.99,
    category: 'streaming',
    description: 'Disney+, Hulu, and ESPN+ bundle. Everything your family needs.',
    features: ['Disney+ Included', 'Hulu (with ads)', 'ESPN+ Sports', 'Family Friendly'],
    content: ['Disney Movies', 'Marvel', 'Star Wars', 'Live Sports', 'TV Shows'],
    rating: 4.8,
    reviews: 18900,
    isPopular: true,
    isNew: false,
    isSale: true,
    trialPeriod: '7 days',
    videoQuality: ['HD', '4K'],
    deviceLimit: '4 streams per service',
    downloadAllowed: true,
    adsIncluded: true
  },
  {
    id: 'hbo-max',
    name: 'Max (HBO Max)',
    provider: 'Warner Bros Discovery',
    price: 15.99,
    category: 'streaming',
    description: 'Premium entertainment with HBO content, blockbuster movies, and originals.',
    features: ['HBO Content', 'Blockbuster Movies', 'Max Originals', 'Same-Day Releases'],
    content: ['HBO Shows', 'Warner Bros Movies', 'DC Content', 'CNN', 'Discovery'],
    rating: 4.5,
    reviews: 12300,
    isPopular: false,
    isNew: false,
    isSale: false,
    trialPeriod: '7 days',
    videoQuality: ['HD', '4K'],
    deviceLimit: '3 streams',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    provider: 'Apple',
    price: 6.99,
    originalPrice: 9.99,
    category: 'streaming',
    description: 'Apple&apos;s premium streaming service with award-winning originals.',
    features: ['Apple Originals', 'Ad-Free', 'Dolby Vision', 'Dolby Atmos'],
    content: ['Apple Originals', 'Award-Winning Shows', 'Documentaries', 'Kids Content'],
    rating: 4.4,
    reviews: 8900,
    isPopular: false,
    isNew: false,
    isSale: true,
    trialPeriod: '7 days',
    videoQuality: ['HD', '4K Dolby Vision'],
    deviceLimit: '6 streams',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'spotify-premium',
    name: 'Spotify Premium',
    provider: 'Spotify',
    price: 10.99,
    originalPrice: 12.99,
    category: 'streaming',
    description: 'Ad-free music streaming with offline downloads and high-quality audio.',
    features: ['Ad-Free Music', 'Offline Downloads', 'High Quality Audio', 'Unlimited Skips'],
    content: ['Music', 'Podcasts', 'Audiobooks', 'Playlists'],
    rating: 4.6,
    reviews: 45200,
    isPopular: true,
    isNew: false,
    isSale: true,
    trialPeriod: '30 days',
    videoQuality: ['Audio Only'],
    deviceLimit: 'Unlimited',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    provider: 'Google',
    price: 13.99,
    category: 'streaming',
    description: 'Ad-free YouTube with background play and YouTube Music included.',
    features: ['Ad-Free YouTube', 'Background Play', 'YouTube Music', 'Downloads'],
    content: ['YouTube Videos', 'YouTube Music', 'YouTube Originals', 'Podcasts'],
    rating: 4.3,
    reviews: 23400,
    isPopular: false,
    isNew: false,
    isSale: false,
    trialPeriod: '30 days',
    videoQuality: ['HD', '4K'],
    deviceLimit: 'Unlimited',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    provider: 'Paramount',
    price: 11.99,
    originalPrice: 14.99,
    category: 'streaming',
    description: 'Live TV and on-demand with CBS, Paramount, and live sports.',
    features: ['Live TV', 'On-Demand', 'Live Sports', 'News'],
    content: ['CBS Shows', 'Paramount Movies', 'Live Sports', 'News', 'Kids Shows'],
    rating: 4.2,
    reviews: 9800,
    isPopular: false,
    isNew: true,
    isSale: true,
    trialPeriod: '7 days',
    videoQuality: ['HD'],
    deviceLimit: '3 streams',
    downloadAllowed: true,
    adsIncluded: false
  },
  {
    id: 'peacock-premium',
    name: 'Peacock Premium',
    provider: 'NBCUniversal',
    price: 7.99,
    category: 'streaming',
    description: 'NBCUniversal content with next-day TV and live sports.',
    features: ['Next-Day TV', 'Live Sports', 'Movies', 'Peacock Originals'],
    content: ['NBC Shows', 'Universal Movies', 'Live Sports', 'News', 'Reality TV'],
    rating: 4.1,
    reviews: 7200,
    isPopular: false,
    isNew: false,
    isSale: false,
    trialPeriod: '7 days',
    videoQuality: ['HD'],
    deviceLimit: '3 streams',
    downloadAllowed: true,
    adsIncluded: true
  }
];

export const streamingFilterOptions = {
  provider: [
    { id: 'netflix', name: 'Netflix', count: 1 },
    { id: 'disney', name: 'Disney', count: 1 },
    { id: 'apple', name: 'Apple', count: 1 },
    { id: 'spotify', name: 'Spotify', count: 1 },
    { id: 'google', name: 'Google', count: 1 },
    { id: 'paramount', name: 'Paramount', count: 1 },
    { id: 'nbcuniversal', name: 'NBCUniversal', count: 1 },
    { id: 'warner', name: 'Warner Bros', count: 1 }
  ],
  price: [
    { id: 'under-10', name: 'Under $10', count: 2 },
    { id: '10-15', name: '$10 - $15', count: 4 },
    { id: 'over-15', name: 'Over $15', count: 2 }
  ],
  contentType: [
    { id: 'movies-tv', name: 'Movies & TV', count: 6 },
    { id: 'music', name: 'Music', count: 2 },
    { id: 'sports', name: 'Live Sports', count: 3 },
    { id: 'news', name: 'News', count: 2 }
  ],
  videoQuality: [
    { id: 'hd', name: 'HD Quality', count: 7 },
    { id: '4k', name: '4K Ultra HD', count: 4 }
  ],
  features: [
    { id: 'no-ads', name: 'Ad-Free', count: 5 },
    { id: 'downloads', name: 'Downloads', count: 8 },
    { id: 'live-tv', name: 'Live TV', count: 2 },
    { id: 'family-friendly', name: 'Family Friendly', count: 3 }
  ]
}; 