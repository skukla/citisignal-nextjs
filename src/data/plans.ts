import { Plan } from '@/types/commerce';
import { PlanFilterOptions, FilterSection } from '@/types/filters';
import { commonPriceRanges, commonFeatures } from './common-filters';

export interface PlanType {
  id: string;
  name: string;
}

export interface PlanFeature {
  name: string;
  description: string;
  availableIn: string[];
}

export const planFilterOptions: PlanFilterOptions = {
  type: [
    { id: 'individual', name: 'Individual' },
    { id: 'family', name: 'Family' },
    { id: 'unlimited', name: 'Unlimited' },
    { id: 'prepaid', name: 'Prepaid' }
  ],
  data: [
    { id: '5gb', name: '5GB' },
    { id: '10gb', name: '10GB' },
    { id: '15gb', name: '15GB' },
    { id: 'unlimited', name: 'Unlimited' }
  ],
  price: commonPriceRanges.plans,
  features: commonFeatures.plans,
  contract: [
    { id: 'required', name: 'Contract Required' },
    { id: 'no-contract', name: 'No Contract' }
  ]
};

// Plan types
export const planTypes: PlanType[] = [
  { id: 'basic', name: 'Basic' },
  { id: 'premium', name: 'Premium' },
  { id: 'unlimited', name: 'Unlimited' }
];

// Plan features
export const planFeatures: PlanFeature[] = [
  {
    name: 'Unlimited Talk & Text',
    description: 'Unlimited nationwide calling and messaging',
    availableIn: ['basic', 'premium', 'unlimited']
  },
  {
    name: 'Mobile Hotspot',
    description: 'Share your data with other devices',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Premium Data',
    description: 'No data slowdowns regardless of usage',
    availableIn: ['unlimited']
  },
  {
    name: 'International Features',
    description: 'Text and data in 200+ countries',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Streaming Quality',
    description: 'HD streaming on supported services',
    availableIn: ['premium', 'unlimited']
  },
  {
    name: 'Network Priority',
    description: 'Priority during network congestion',
    availableIn: ['unlimited']
  }
];

// Filter sections
export const planFilters: FilterSection[] = [
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
];

// Mock data matching Commerce API structure
export const plans: Plan[] = [
  {
    id: '1',
    sku: 'PLAN-UNLIMITED-MAX',
    name: 'CitiSignal Unlimited Max',
    url_key: 'citisignal-unlimited-max',
    description: 'Our premium unlimited plan with all the perks.',
    price: 85,
    currency: 'USD',
    rating_summary: 94,
    review_count: 1250,
    media_gallery: [
      {
        url: '/plans/unlimited-max.jpg',
        label: 'CitiSignal Unlimited Max Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'plans',
    stock_status: 'IN_STOCK',
    type: 'unlimited',
    data: 'Unlimited Premium',
    talk: 'Unlimited',
    text: 'Unlimited',
    hotspot: '40GB high-speed data',
    streaming: ['Up to 4k UHD streaming'],
    network_priority: 'premium',
    contract_required: false,
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'PLAN-FAMILY-SHARE',
    name: 'CitiSignal Family Share',
    url_key: 'citisignal-family-share',
    description: 'Perfect for families with shared data and individual lines.',
    price: 120,
    original_price: 140,
    currency: 'USD',
    rating_summary: 88,
    review_count: 850,
    media_gallery: [
      {
        url: '/plans/family-share.jpg',
        label: 'CitiSignal Family Share Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'plans',
    stock_status: 'IN_STOCK',
    type: 'family',
    data: '100GB',
    talk: 'Unlimited',
    text: 'Unlimited',
    hotspot: '5GB high-speed data',
    streaming: ['SD Streaming'],
    network_priority: 'standard',
    contract_required: true,
    isNew: true,
    isSale: true
  },
  {
    id: '3',
    sku: 'PLAN-ESSENTIALS',
    name: 'CitiSignal Essentials',
    url_key: 'citisignal-essentials',
    description: 'Basic plan with everything you need.',
    price: 45,
    currency: 'USD',
    rating_summary: 86,
    review_count: 620,
    media_gallery: [
      {
        url: '/plans/essentials.jpg',
        label: 'CitiSignal Essentials Plan',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'plans',
    stock_status: 'IN_STOCK',
    type: 'individual',
    data: '50GB',
    talk: 'Unlimited',
    text: 'Unlimited',
    hotspot: 'Unlimited 3G speed',
    streaming: ['SD Streaming'],
    network_priority: 'basic',
    contract_required: false,
    isNew: false,
    isSale: false
  }
]; 