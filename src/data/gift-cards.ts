import { BaseProduct } from '@/types/commerce';
import { GiftCardFilterOptions } from '@/types/filters';

export interface GiftCard extends BaseProduct {
  type: 'physical' | 'digital';
  delivery_time: string;
  expiration: string;
  customizable: boolean;
}

export const giftCardFilterOptions: GiftCardFilterOptions = {
  type: [
    { id: 'physical', name: 'Physical Card' },
    { id: 'digital', name: 'Digital Card' }
  ],
  amount: [
    { id: '25', name: '$25' },
    { id: '50', name: '$50' },
    { id: '100', name: '$100' },
    { id: '200', name: '$200' }
  ],
  delivery_time: [
    { id: 'instant', name: 'Instant' },
    { id: '1-2-days', name: '1-2 Business Days' },
    { id: '3-5-days', name: '3-5 Business Days' }
  ]
};

export const giftCards: GiftCard[] = [
  {
    id: '1',
    sku: 'GIFT-DIG-25',
    name: '$25 Digital Gift Card',
    url_key: 'digital-gift-card-25',
    description: 'Instant digital gift card for CitiSignal products and services.',
    price: 25,
    currency: 'USD',
    rating_summary: 92,
    review_count: 245,
    media_gallery: [
      {
        url: '/gift-cards/digital-25.jpg',
        label: '$25 Digital Gift Card',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'digital',
    delivery_time: 'Instant',
    expiration: '12 months from purchase',
    customizable: true,
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'GIFT-PHY-50',
    name: '$50 Physical Gift Card',
    url_key: 'physical-gift-card-50',
    description: 'Premium physical gift card with custom greeting card.',
    price: 50,
    currency: 'USD',
    rating_summary: 88,
    review_count: 156,
    media_gallery: [
      {
        url: '/gift-cards/physical-50.jpg',
        label: '$50 Physical Gift Card',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'physical',
    delivery_time: '3-5 Business Days',
    expiration: '24 months from activation',
    customizable: true,
    isNew: false,
    isSale: false
  },
  {
    id: '3',
    sku: 'GIFT-DIG-100-HOLIDAY',
    name: '$100 Digital Holiday Gift Card',
    url_key: 'digital-gift-card-100-holiday',
    description: 'Special holiday-themed digital gift card with instant delivery.',
    price: 100,
    currency: 'USD',
    rating_summary: 94,
    review_count: 312,
    media_gallery: [
      {
        url: '/gift-cards/digital-100-holiday.jpg',
        label: '$100 Digital Holiday Gift Card',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'gift-cards',
    stock_status: 'IN_STOCK',
    type: 'digital',
    delivery_time: 'Instant',
    expiration: '24 months from purchase',
    customizable: true,
    isNew: true,
    isSale: false
  }
]; 