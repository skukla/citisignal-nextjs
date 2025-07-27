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

// Mock data matching Commerce API structure
export const giftCards: GiftCard[] = [
  // ... existing gift cards data ...
]; 