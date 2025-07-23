import { Accessory, colorOptions } from '@/types/commerce';

export const accessoryFilterOptions = {
  manufacturer: [
    { id: 'apple', name: 'Apple' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'citisignal', name: 'CitiSignal' },
    { id: 'belkin', name: 'Belkin' },
    { id: 'anker', name: 'Anker' }
  ],
  compatibility: [
    { id: 'iphone', name: 'iPhone' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'android', name: 'Android' },
    { id: 'universal', name: 'Universal' }
  ],
  colors: colorOptions,
  price: [
    { id: 'under-25', name: 'Under $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: 'over-100', name: 'Over $100' }
  ]
};

// Mock data matching Commerce API structure
export const accessories: Accessory[] = [
  {
    id: '1',
    sku: 'ACC-MAGSAFE-CHARGER',
    name: 'MagSafe Wireless Charger',
    url_key: 'magsafe-wireless-charger',
    description: 'Fast wireless charging with perfect magnetic alignment for iPhone.',
    price: 39.99,
    currency: 'USD',
    rating_summary: 92,
    review_count: 450,
    media_gallery: [
      {
        url: '/accessories/magsafe-charger.jpg',
        label: 'MagSafe Wireless Charger White',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    compatibility: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15'],
    available_colors: [
      { name: 'White', hex: '#F9F9F9' }
    ],
    isNew: false,
    isSale: false
  },
  {
    id: '2',
    sku: 'ACC-FAST-CHARGER-25W',
    name: '25W Fast Charging Adapter',
    url_key: '25w-fast-charging-adapter',
    description: 'Super fast charging for all your devices with USB-C power delivery.',
    price: 19.99,
    currency: 'USD',
    rating_summary: 88,
    review_count: 325,
    media_gallery: [
      {
        url: '/accessories/fast-charger.jpg',
        label: '25W Fast Charging Adapter',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'Samsung',
    compatibility: ['Universal'],
    available_colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#F9F9F9' }
    ],
    isNew: false,
    isSale: true
  },
  {
    id: '3',
    sku: 'ACC-CS-POWERBANK-20K',
    name: 'CitiSignal PowerCore 20000mAh',
    url_key: 'citisignal-powercore-20000',
    description: 'High-capacity portable charger with dual USB-C ports and fast charging.',
    price: 49.99,
    original_price: 59.99,
    currency: 'USD',
    rating_summary: 94,
    review_count: 128,
    media_gallery: [
      {
        url: '/accessories/powerbank.jpg',
        label: 'CitiSignal PowerCore 20000mAh Navy',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'accessories',
    stock_status: 'IN_STOCK',
    manufacturer: 'CitiSignal',
    compatibility: ['Universal'],
    available_colors: [
      { name: 'Navy', hex: '#1F2330' },
      { name: 'Graphite', hex: '#5F5E5A' }
    ],
    isNew: true,
    isSale: true
  }
]; 