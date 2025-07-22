export interface GiftCard {
  id: string;
  name: string;
  type: 'physical' | 'digital' | 'service';
  amount: number;
  category: string;
  description: string;
  features: string[];
  image: string;
  rating: number;
  reviews: number;
  isPopular: boolean;
  isNew: boolean;
  deliveryTime: string;
  validityPeriod: string;
  restrictions?: string[];
}

export const giftCards: GiftCard[] = [
  {
    id: 'citisignal-gift-card-25',
    name: 'CitiSignal Gift Card $25',
    type: 'digital',
    amount: 25,
    category: 'gift-cards',
    description: 'Perfect for accessories, cases, or plan credits. Digital delivery within minutes.',
    features: ['Instant Digital Delivery', 'No Expiration Date', 'Use for Any Purchase', 'Email or Print'],
    image: '/gift-cards/citisignal-25.jpg',
    rating: 4.7,
    reviews: 890,
    isPopular: false,
    isNew: false,
    deliveryTime: 'Instant',
    validityPeriod: 'No Expiration',
    restrictions: ['Cannot be used for monthly service charges']
  },
  {
    id: 'citisignal-gift-card-50',
    name: 'CitiSignal Gift Card $50',
    type: 'digital',
    amount: 50,
    category: 'gift-cards',
    description: 'Great for accessories or partial device payments. Most popular gift card amount.',
    features: ['Instant Digital Delivery', 'No Expiration Date', 'Use for Any Purchase', 'Email or Print'],
    image: '/gift-cards/citisignal-50.jpg',
    rating: 4.8,
    reviews: 1560,
    isPopular: true,
    isNew: false,
    deliveryTime: 'Instant',
    validityPeriod: 'No Expiration'
  },
  {
    id: 'citisignal-gift-card-100',
    name: 'CitiSignal Gift Card $100',
    type: 'digital',
    amount: 100,
    category: 'gift-cards',
    description: 'Perfect for new device purchases or multiple accessories. Free bonus card holder.',
    features: ['Instant Digital Delivery', 'No Expiration Date', 'Use for Any Purchase', 'Bonus Card Holder'],
    image: '/gift-cards/citisignal-100.jpg',
    rating: 4.8,
    reviews: 1240,
    isPopular: true,
    isNew: false,
    deliveryTime: 'Instant',
    validityPeriod: 'No Expiration'
  },
  {
    id: 'citisignal-gift-card-200',
    name: 'CitiSignal Gift Card $200',
    type: 'digital',
    amount: 200,
    category: 'gift-cards',
    description: 'Ideal for premium device purchases. Includes premium gift box for physical delivery option.',
    features: ['Digital or Physical Delivery', 'No Expiration Date', 'Premium Gift Box', 'Personal Message'],
    image: '/gift-cards/citisignal-200.jpg',
    rating: 4.9,
    reviews: 670,
    isPopular: false,
    isNew: false,
    deliveryTime: 'Instant or 2-3 days',
    validityPeriod: 'No Expiration'
  },
  {
    id: 'service-credit-month',
    name: 'One Month Service Credit',
    type: 'service',
    amount: 65,
    category: 'gift-cards',
    description: 'Give the gift of one month of unlimited service. Perfect for new customers.',
    features: ['Service Plan Credit', 'Works with Any Plan', 'Auto-Applied to Account', 'Perfect for Gifting'],
    image: '/gift-cards/service-credit.jpg',
    rating: 4.6,
    reviews: 450,
    isPopular: false,
    isNew: true,
    deliveryTime: 'Instant',
    validityPeriod: '12 months',
    restrictions: ['Must be applied to active account', 'Cannot be combined with other promotions']
  },
  {
    id: 'accessory-bundle-gift',
    name: 'Accessory Bundle Gift Card',
    type: 'digital',
    amount: 75,
    category: 'gift-cards',
    description: 'Specially curated for accessory purchases. Includes recommendations guide.',
    features: ['Accessory-Focused', 'Includes Shopping Guide', 'Expert Recommendations', 'Digital Delivery'],
    image: '/gift-cards/accessory-bundle.jpg',
    rating: 4.5,
    reviews: 320,
    isPopular: false,
    isNew: true,
    deliveryTime: 'Instant',
    validityPeriod: 'No Expiration',
    restrictions: ['Can only be used for accessories and cases']
  },
  {
    id: 'premium-device-gift',
    name: 'Premium Device Gift Card',
    type: 'physical',
    amount: 500,
    category: 'gift-cards',
    description: 'Premium gift card for high-end device purchases. Comes in luxury packaging.',
    features: ['Luxury Packaging', 'Personal Concierge Service', 'Device Setup Included', 'Premium Support'],
    image: '/gift-cards/premium-device.jpg',
    rating: 4.9,
    reviews: 150,
    isPopular: false,
    isNew: false,
    deliveryTime: '2-3 business days',
    validityPeriod: 'No Expiration'
  },
  {
    id: 'family-plan-gift',
    name: 'Family Plan Starter Gift',
    type: 'service',
    amount: 160,
    category: 'gift-cards',
    description: 'Perfect for families starting their CitiSignal journey. Covers first month for 4 lines.',
    features: ['Family Plan Credit', 'Covers 4 Lines', 'Includes Setup Service', 'Family Safety Features'],
    image: '/gift-cards/family-plan.jpg',
    rating: 4.7,
    reviews: 280,
    isPopular: false,
    isNew: false,
    deliveryTime: 'Instant',
    validityPeriod: '12 months',
    restrictions: ['Must be applied to new family plan', 'Minimum 4 lines required']
  }
];

export const giftCardFilterOptions = {
  type: [
    { id: 'digital', name: 'Digital Cards', count: 4 },
    { id: 'physical', name: 'Physical Cards', count: 1 },
    { id: 'service', name: 'Service Credits', count: 3 }
  ],
  amount: [
    { id: 'under-50', name: 'Under $50', count: 1 },
    { id: '50-100', name: '$50 - $100', count: 3 },
    { id: '100-200', name: '$100 - $200', count: 2 },
    { id: 'over-200', name: 'Over $200', count: 2 }
  ],
  deliveryTime: [
    { id: 'instant', name: 'Instant Delivery', count: 6 },
    { id: 'physical', name: '2-3 Business Days', count: 2 }
  ],
  purpose: [
    { id: 'general', name: 'General Use', count: 4 },
    { id: 'accessories', name: 'Accessories Only', count: 1 },
    { id: 'service', name: 'Service Plans', count: 2 },
    { id: 'devices', name: 'Device Purchase', count: 1 }
  ]
}; 