import { BaseProduct } from '@/types/commerce';

export interface GiftCard extends BaseProduct {
  type: 'physical' | 'digital' | 'service';
  amount: number;
  delivery_time: string;
  validity_period: string;
  restrictions?: string[];
}

export const giftCardFilterOptions = {
  type: [
    { id: 'physical', name: 'Physical Card' },
    { id: 'digital', name: 'Digital Card' },
    { id: 'service', name: 'Service Credit' }
  ],
  amount: [
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: 'over-200', name: 'Over $200' }
  ],
  delivery_time: [
    { id: 'instant', name: 'Instant Delivery' },
    { id: 'physical', name: 'Physical Shipping' }
  ]
};

// Mock data matching Commerce API structure
export const giftCards: GiftCard[] = [
  {
    id: '1',
    sku: 'GIFT-CARD-DIGITAL-100',
    name: 'Digital Gift Card $100',
    url_key: 'digital-gift-card-100',
    description: 'Instant digital gift card delivered via email.',
    price: 100,
    currency: 'USD',
    rating_summary: 92,
    review_count: 245,
    media_gallery: [
      {
        url: '/gift-cards/digital-100.jpg',
        label: 'Digital Gift Card $100',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'digital',
    amount: 100,
    delivery_time: 'Instant Delivery',
    validity_period: '12 months',
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'GIFT-CARD-PHYSICAL-50',
    name: 'Physical Gift Card $50',
    url_key: 'physical-gift-card-50',
    description: 'Premium physical gift card with custom message, delivered by mail.',
    price: 50,
    currency: 'USD',
    rating_summary: 88,
    review_count: 156,
    media_gallery: [
      {
        url: '/gift-cards/physical-50.jpg',
        label: 'Physical Gift Card $50',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'physical',
    amount: 50,
    delivery_time: '3-5 business days',
    validity_period: '24 months',
    isNew: true,
    isSale: false
  },
  {
    id: '3',
    sku: 'GIFT-CARD-SERVICE-200',
    name: 'Service Credit $200',
    url_key: 'service-credit-200',
    description: 'Service credit for CitiSignal plans and services.',
    price: 180,
    original_price: 200,
    currency: 'USD',
    rating_summary: 94,
    review_count: 89,
    media_gallery: [
      {
        url: '/gift-cards/service-200.jpg',
        label: 'Service Credit $200',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'service',
    amount: 200,
    delivery_time: 'Instant Delivery',
    validity_period: '36 months',
    restrictions: ['Valid for service payments only', 'Cannot be combined with other promotions'],
    isNew: false,
    isSale: true
  }
]; 