export interface Accessory {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  subcategory: string;
  features: string[];
  colors: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  compatibility: string[];
}

export const accessories: Accessory[] = [
  {
    id: 'wireless-charger-1',
    name: 'MagSafe Wireless Charger',
    brand: 'Apple',
    price: 39,
    originalPrice: 49,
    rating: 4.5,
    reviews: 1250,
    image: '/accessories/wireless-charger.jpg',
    category: 'accessories',
    subcategory: 'chargers',
    features: ['15W Fast Charging', 'MagSafe Compatible', 'LED Indicator'],
    colors: ['White'],
    inStock: true,
    isNew: false,
    isSale: true,
    compatibility: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15']
  },
  {
    id: 'phone-case-1',
    name: 'Leather Phone Case',
    brand: 'Apple',
    price: 59,
    rating: 4.7,
    reviews: 890,
    image: '/accessories/leather-case.jpg',
    category: 'accessories',
    subcategory: 'cases',
    features: ['Genuine Leather', 'Drop Protection', 'Precise Cutouts'],
    colors: ['Black', 'Brown', 'Midnight', 'Product Red'],
    inStock: true,
    isNew: true,
    isSale: false,
    compatibility: ['iPhone 15 Pro', 'iPhone 15 Pro Max']
  },
  {
    id: 'bluetooth-headphones-1',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    price: 249,
    originalPrice: 279,
    rating: 4.8,
    reviews: 3420,
    image: '/accessories/airpods-pro.jpg',
    category: 'accessories',
    subcategory: 'headphones',
    features: ['Active Noise Cancellation', 'Spatial Audio', 'Transparency Mode'],
    colors: ['White'],
    inStock: true,
    isNew: false,
    isSale: true,
    compatibility: ['iPhone', 'iPad', 'Mac', 'Apple Watch']
  },
  {
    id: 'car-charger-1',
    name: 'Dual USB Car Charger',
    brand: 'Anker',
    price: 19,
    rating: 4.6,
    reviews: 567,
    image: '/accessories/car-charger.jpg',
    category: 'accessories',
    subcategory: 'chargers',
    features: ['Dual Ports', 'Fast Charging', 'LED Indicator'],
    colors: ['Black'],
    inStock: true,
    isNew: false,
    isSale: false,
    compatibility: ['Universal']
  },
  {
    id: 'screen-protector-1',
    name: 'Tempered Glass Screen Protector',
    brand: 'Belkin',
    price: 29,
    originalPrice: 39,
    rating: 4.4,
    reviews: 445,
    image: '/accessories/screen-protector.jpg',
    category: 'accessories',
    subcategory: 'protection',
    features: ['9H Hardness', 'Anti-Fingerprint', 'Easy Installation'],
    colors: ['Clear'],
    inStock: true,
    isNew: false,
    isSale: true,
    compatibility: ['iPhone 15', 'iPhone 15 Plus']
  },
  {
    id: 'phone-stand-1',
    name: 'Adjustable Phone Stand',
    brand: 'Lamicall',
    price: 15,
    rating: 4.3,
    reviews: 234,
    image: '/accessories/phone-stand.jpg',
    category: 'accessories',
    subcategory: 'stands',
    features: ['Adjustable Angle', 'Non-Slip Base', 'Foldable Design'],
    colors: ['Silver', 'Black', 'Rose Gold'],
    inStock: true,
    isNew: false,
    isSale: false,
    compatibility: ['Universal']
  },
  {
    id: 'power-bank-1',
    name: 'Portable Power Bank 10000mAh',
    brand: 'Anker',
    price: 45,
    originalPrice: 55,
    rating: 4.7,
    reviews: 1890,
    image: '/accessories/power-bank.jpg',
    category: 'accessories',
    subcategory: 'chargers',
    features: ['10000mAh Capacity', 'Fast Charging', 'LED Display'],
    colors: ['Black', 'White'],
    inStock: true,
    isNew: false,
    isSale: true,
    compatibility: ['Universal']
  },
  {
    id: 'bluetooth-speaker-1',
    name: 'Bluetooth Speaker',
    brand: 'JBL',
    price: 79,
    rating: 4.5,
    reviews: 723,
    image: '/accessories/bluetooth-speaker.jpg',
    category: 'accessories',
    subcategory: 'audio',
    features: ['Waterproof', '12-Hour Battery', 'JBL Pro Sound'],
    colors: ['Black', 'Blue', 'Red', 'Green'],
    inStock: false,
    isNew: false,
    isSale: false,
    compatibility: ['Universal']
  },
  {
    id: 'cable-lightning-1',
    name: 'Lightning to USB-C Cable',
    brand: 'Apple',
    price: 29,
    rating: 4.6,
    reviews: 567,
    image: '/accessories/lightning-cable.jpg',
    category: 'accessories',
    subcategory: 'cables',
    features: ['1m Length', 'Fast Data Transfer', 'Durable Design'],
    colors: ['White'],
    inStock: true,
    isNew: false,
    isSale: false,
    compatibility: ['iPhone', 'iPad']
  },
  {
    id: 'smartwatch-band-1',
    name: 'Sport Band for Apple Watch',
    brand: 'Apple',
    price: 49,
    rating: 4.4,
    reviews: 890,
    image: '/accessories/sport-band.jpg',
    category: 'accessories',
    subcategory: 'watch-bands',
    features: ['Fluoroelastomer Material', 'Sweat Resistant', 'Pin-and-tuck Closure'],
    colors: ['Black', 'White', 'Ocean Blue', 'Pink Sand', 'Product Red'],
    inStock: true,
    isNew: true,
    isSale: false,
    compatibility: ['Apple Watch']
  },
  {
    id: 'tablet-stand-1',
    name: 'Adjustable Tablet Stand',
    brand: 'OMOTON',
    price: 25,
    rating: 4.5,
    reviews: 345,
    image: '/accessories/tablet-stand.jpg',
    category: 'accessories',
    subcategory: 'stands',
    features: ['Multi-Angle Adjustment', 'Aluminum Alloy', 'Non-Slip Pads'],
    colors: ['Silver', 'Space Gray'],
    inStock: true,
    isNew: false,
    isSale: false,
    compatibility: ['iPad', 'Tablets']
  },
  {
    id: 'wireless-mouse-1',
    name: 'Wireless Mouse',
    brand: 'Logitech',
    price: 35,
    originalPrice: 45,
    rating: 4.3,
    reviews: 567,
    image: '/accessories/wireless-mouse.jpg',
    category: 'accessories',
    subcategory: 'computer',
    features: ['Wireless 2.4GHz', 'Ergonomic Design', '18-Month Battery'],
    colors: ['Black', 'White'],
    inStock: true,
    isNew: false,
    isSale: true,
    compatibility: ['Universal']
  }
];

export const filterOptions = {
  subcategory: [
    { id: 'chargers', name: 'Chargers & Power', count: 3 },
    { id: 'cases', name: 'Cases & Protection', count: 2 },
    { id: 'headphones', name: 'Headphones & Audio', count: 2 },
    { id: 'stands', name: 'Stands & Mounts', count: 2 },
    { id: 'cables', name: 'Cables & Adapters', count: 1 },
    { id: 'watch-bands', name: 'Watch Bands', count: 1 },
    { id: 'computer', name: 'Computer Accessories', count: 1 }
  ],
  brand: [
    { id: 'apple', name: 'Apple', count: 6 },
    { id: 'anker', name: 'Anker', count: 2 },
    { id: 'belkin', name: 'Belkin', count: 1 },
    { id: 'jbl', name: 'JBL', count: 1 },
    { id: 'lamicall', name: 'Lamicall', count: 1 },
    { id: 'omoton', name: 'OMOTON', count: 1 },
    { id: 'logitech', name: 'Logitech', count: 1 }
  ],
  price: [
    { id: 'under-25', name: 'Under $25', count: 3 },
    { id: '25-50', name: '$25 - $50', count: 6 },
    { id: '50-100', name: '$50 - $100', count: 3 },
    { id: 'over-100', name: 'Over $100', count: 0 }
  ],
  compatibility: [
    { id: 'iphone', name: 'iPhone', count: 4 },
    { id: 'ipad', name: 'iPad', count: 2 },
    { id: 'apple-watch', name: 'Apple Watch', count: 2 },
    { id: 'universal', name: 'Universal', count: 4 }
  ]
}; 