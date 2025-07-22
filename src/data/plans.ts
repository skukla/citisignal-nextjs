export interface Plan {
  id: string;
  name: string;
  type: 'individual' | 'family' | 'unlimited' | 'prepaid';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  data: string;
  talk: string;
  text: string;
  features: string[];
  hotspot: string;
  streaming: string[];
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  contractRequired: boolean;
  networkPriority: 'premium' | 'standard' | 'basic';
}

export const plans: Plan[] = [
  {
    id: 'unlimited-premium',
    name: 'Unlimited Premium',
    type: 'unlimited',
    price: 85,
    originalPrice: 95,
    rating: 4.8,
    reviews: 2340,
    category: 'plans',
    data: 'Unlimited',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['5G Ultra Wideband', 'Premium Network Access', 'International Roaming', 'Mobile Hotspot 50GB'],
    hotspot: '50GB',
    streaming: ['Netflix', 'Disney+', 'Apple Music'],
    isPopular: true,
    isNew: false,
    isSale: true,
    contractRequired: false,
    networkPriority: 'premium'
  },
  {
    id: 'unlimited-basic',
    name: 'Unlimited Basic',
    type: 'unlimited',
    price: 65,
    rating: 4.6,
    reviews: 1890,
    category: 'plans',
    data: 'Unlimited',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['5G Nationwide', 'Standard Network Access', 'Mobile Hotspot 15GB'],
    hotspot: '15GB',
    streaming: ['Apple Music'],
    isPopular: false,
    isNew: false,
    isSale: false,
    contractRequired: false,
    networkPriority: 'standard'
  },
  {
    id: 'family-plan-4',
    name: 'Family Plan (4 Lines)',
    type: 'family',
    price: 160,
    originalPrice: 180,
    rating: 4.7,
    reviews: 1560,
    category: 'plans',
    data: 'Unlimited per line',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['5G Access', 'Family Safety Features', 'Shared Hotspot 100GB', 'Multi-device Management'],
    hotspot: '100GB Shared',
    streaming: ['Netflix', 'Spotify'],
    isPopular: true,
    isNew: false,
    isSale: true,
    contractRequired: false,
    networkPriority: 'standard'
  },
  {
    id: 'data-plus-10gb',
    name: 'Data Plus 10GB',
    type: 'individual',
    price: 45,
    rating: 4.4,
    reviews: 890,
    category: 'plans',
    data: '10GB',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['5G Access', 'Mobile Hotspot 5GB', 'Overage Protection'],
    hotspot: '5GB',
    streaming: [],
    isPopular: false,
    isNew: false,
    isSale: false,
    contractRequired: false,
    networkPriority: 'standard'
  },
  {
    id: 'prepaid-unlimited',
    name: 'Prepaid Unlimited',
    type: 'prepaid',
    price: 50,
    originalPrice: 60,
    rating: 4.3,
    reviews: 1240,
    category: 'plans',
    data: 'Unlimited',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['No Contract', 'Autopay Discount', 'Mobile Hotspot 10GB'],
    hotspot: '10GB',
    streaming: [],
    isPopular: false,
    isNew: true,
    isSale: true,
    contractRequired: false,
    networkPriority: 'basic'
  },
  {
    id: 'starter-plan',
    name: 'Starter Plan',
    type: 'individual',
    price: 30,
    rating: 4.2,
    reviews: 567,
    category: 'plans',
    data: '5GB',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['4G LTE Access', 'Basic Features'],
    hotspot: 'None',
    streaming: [],
    isPopular: false,
    isNew: false,
    isSale: false,
    contractRequired: false,
    networkPriority: 'basic'
  },
  {
    id: 'family-plan-6',
    name: 'Family Plan (6 Lines)',
    type: 'family',
    price: 210,
    originalPrice: 240,
    rating: 4.6,
    reviews: 780,
    category: 'plans',
    data: 'Unlimited per line',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['5G Ultra Access', 'Premium Family Features', 'Shared Hotspot 150GB', 'Parental Controls'],
    hotspot: '150GB Shared',
    streaming: ['Netflix', 'Disney+', 'Hulu', 'Apple Music'],
    isPopular: false,
    isNew: true,
    isSale: true,
    contractRequired: false,
    networkPriority: 'premium'
  },
  {
    id: 'business-unlimited',
    name: 'Business Unlimited',
    type: 'unlimited',
    price: 75,
    rating: 4.5,
    reviews: 450,
    category: 'plans',
    data: 'Unlimited',
    talk: 'Unlimited',
    text: 'Unlimited',
    features: ['Business Priority', 'Cloud Storage 100GB', 'Mobile Hotspot 30GB', 'Enterprise Support'],
    hotspot: '30GB',
    streaming: [],
    isPopular: false,
    isNew: false,
    isSale: false,
    contractRequired: false,
    networkPriority: 'premium'
  }
];

export const planFilterOptions = {
  type: [
    { id: 'unlimited', name: 'Unlimited', count: 4 },
    { id: 'family', name: 'Family Plans', count: 2 },
    { id: 'individual', name: 'Individual Plans', count: 2 },
    { id: 'prepaid', name: 'Prepaid', count: 1 }
  ],
  price: [
    { id: 'under-50', name: 'Under $50', count: 3 },
    { id: '50-100', name: '$50 - $100', count: 4 },
    { id: 'over-100', name: 'Over $100', count: 1 }
  ],
  data: [
    { id: 'unlimited', name: 'Unlimited Data', count: 6 },
    { id: 'limited', name: 'Limited Data', count: 2 }
  ],
  features: [
    { id: '5g', name: '5G Access', count: 7 },
    { id: 'hotspot', name: 'Mobile Hotspot', count: 7 },
    { id: 'streaming', name: 'Streaming Included', count: 4 },
    { id: 'no-contract', name: 'No Contract', count: 8 }
  ],
  networkPriority: [
    { id: 'premium', name: 'Premium Priority', count: 3 },
    { id: 'standard', name: 'Standard Priority', count: 3 },
    { id: 'basic', name: 'Basic Priority', count: 2 }
  ]
}; 