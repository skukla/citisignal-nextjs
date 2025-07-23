import { Phone, colorOptions } from '@/types/commerce';

export const phoneFilterOptions = {
  manufacturer: [
    { id: 'apple', name: 'Apple' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'citisignal', name: 'CitiSignal' }
  ],
  memory: [
    { id: '128gb', name: '128GB' },
    { id: '256gb', name: '256GB' },
    { id: '512gb', name: '512GB' },
    { id: '1tb', name: '1TB' }
  ],
  colors: colorOptions,
  price: [
    { id: 'under-700', name: 'Under $700' },
    { id: '700-1000', name: '$700 - $1000' },
    { id: 'over-1000', name: 'Over $1000' }
  ],
  features: [
    { id: 'extended-capacity-5g', name: 'Extended Capacity 5G' },
    { id: 'extended-range-5g', name: 'Extended Range 5G' }
  ]
};

// Mock data matching Commerce API structure
export const phones: Phone[] = [
  {
    id: '1',
    sku: 'PHONE-IPHONE-15-PRO-128',
    name: 'iPhone 15 Pro',
    url_key: 'iphone-15-pro',
    description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
    price: 999,
    original_price: 1099,
    currency: 'USD',
    rating_summary: 90,
    review_count: 125,
    media_gallery: [
      {
        url: '/phones/iphone-15-pro.jpg',
        label: 'iPhone 15 Pro Natural Titanium',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    memory: ['128GB', '256GB', '512GB', '1TB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Natural Titanium', hex: '#9FA1A3' },
      { name: 'Blue Titanium', hex: '#515B6F' },
      { name: 'White Titanium', hex: '#F5F5F0' },
      { name: 'Black Titanium', hex: '#3D3C41' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    sku: 'PHONE-S24-ULTRA-256',
    name: 'Galaxy S24 Ultra',
    url_key: 'galaxy-s24-ultra',
    description: 'The ultimate Galaxy experience with AI features, S Pen, and advanced camera system.',
    price: 1199,
    original_price: 1299,
    currency: 'USD',
    rating_summary: 88,
    review_count: 95,
    media_gallery: [
      {
        url: '/phones/galaxy-s24-ultra.jpg',
        label: 'Galaxy S24 Ultra Titanium Black',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'Samsung',
    memory: ['256GB', '512GB', '1TB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Titanium Black', hex: '#2A2A2C' },
      { name: 'Titanium Gray', hex: '#7C7C7E' },
      { name: 'Titanium Violet', hex: '#7B6C7E' },
      { name: 'Titanium Yellow', hex: '#F3E0B6' }
    ],
    isNew: true,
    isSale: true
  },
  {
    id: '3',
    sku: 'PHONE-CS-ULTRA-5G',
    name: 'CitiSignal Ultra 5G',
    url_key: 'citisignal-ultra-5g',
    description: 'Experience the power of CitiSignal with advanced 5G capabilities and premium features.',
    price: 899,
    currency: 'USD',
    rating_summary: 85,
    review_count: 45,
    media_gallery: [
      {
        url: '/phones/citisignal-ultra.jpg',
        label: 'CitiSignal Ultra 5G Midnight Blue',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'CitiSignal',
    memory: ['128GB', '256GB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Midnight Blue', hex: '#1F2330' },
      { name: 'Silver', hex: '#F1F3EE' },
      { name: 'Graphite', hex: '#5F5E5A' }
    ],
    isNew: true,
    isSale: false
  },
  {
    id: '4',
    sku: 'PHONE-IPHONE-15-128',
    name: 'iPhone 15',
    url_key: 'iphone-15',
    description: 'The powerful iPhone 15 with A16 Bionic chip, Dynamic Island, and advanced camera system.',
    price: 799,
    original_price: 899,
    currency: 'USD',
    rating_summary: 92,
    review_count: 210,
    media_gallery: [
      {
        url: '/phones/iphone-15.jpg',
        label: 'iPhone 15 Pink',
        roles: ['small_image', 'thumbnail']
      }
    ],
    category: 'phones',
    stock_status: 'IN_STOCK',
    manufacturer: 'Apple',
    memory: ['128GB', '256GB', '512GB'],
    extended_capacity_5g: true,
    extended_range_5g: true,
    available_colors: [
      { name: 'Pink', hex: '#F8D7D9' },
      { name: 'Yellow', hex: '#F3E3B6' },
      { name: 'Green', hex: '#A7C1B5' },
      { name: 'Blue', hex: '#B4C4DE' },
      { name: 'Black', hex: '#3F3F3D' }
    ],
    isNew: true,
    isSale: true
  }
]; 